import { database } from '$lib/data/database.js'
import { dev } from '$app/env'
import { scryptSync, randomBytes } from 'node:crypto'
import 'dotenv/config'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ locals }) => {
  const users = await database.user.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      roles: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  return {
    body: { users },
  }
}

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

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request, locals }) => {
  try {
    const { username, name, email, password, role } = await request.json()
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
              name: role,
            },
            create: {
              name: role,
            },
          },
        },
      },
      include: { roles: true },
    })
    delete user.password
    return {
      body: { user },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
