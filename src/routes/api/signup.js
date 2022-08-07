import { database } from '$lib/data/database.js'
import { dev } from '$app/env'
import { scryptSync, randomBytes } from 'node:crypto'
import { createSigner } from 'fast-jwt'
import 'dotenv/config'

const sign = createSigner({ key: process.env.JWT_SECRET })

const tokenExpiresIn = 30 // days

const encryptPassword = (password, salt) => {
  return scryptSync(password, salt, 32).toString('hex')
}
const hashPassword = password => {
  const salt = randomBytes(16).toString('hex')
  return encryptPassword(password, salt) + salt
}

function isValidEmail(email) {
  // Real validation sends a verification email. Just do a basic format check
  const mailFormatRegex = /^\S+@\S+\.\S+$/
  return email.match(mailFormatRegex)
}

// only used for creating initial admin user
/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request, locals }) => {
  try {
    const { username, name, email, password } = await request.json()
    if (!isValidEmail(email)) {
      throw new Error('email address not valid')
    }
    if (!username || !password) {
      throw new Error('A required argument is missing.')
    }
    const usernameTaken = await database.user.findFirst({
      where: { username },
    })
    if (usernameTaken) throw new Error('Username already exists')
    const hashedPassword = hashPassword(password)
    const user = await database.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        roles: {
          connectOrCreate: {
            where: {
              name: 'admin',
            },
            create: {
              name: 'admin',
            },
          },
        },
      },
      include: { roles: true },
    })
    const token = sign({ userId: user.id })
    delete user.password
    const secure = dev ? '' : ' Secure;'
    return {
      body: { user },
      headers: {
        'set-cookie': [
          `token=${token}; Max-Age=${
            tokenExpiresIn * 24 * 60 * 60
          }; Path=/; ${secure} HttpOnly`,
        ],
      },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
