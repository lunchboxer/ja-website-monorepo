import { database } from '$lib/data/database.js'
import { scryptSync } from 'node:crypto'
import { createSigner } from 'fast-jwt'
import { dev } from '$app/env'
import 'dotenv/config'

const sign = createSigner({ key: process.env.JWT_SECRET })

const encryptPassword = (password, salt) => {
  return scryptSync(password, salt, 32).toString('hex')
}

const passwordMatches = (password, hash) => {
  const salt = hash.slice(64)
  const originalPassHash = hash.slice(0, 64)
  const currentPassHash = encryptPassword(password, salt)
  return originalPassHash === currentPassHash
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request }) => {
  try {
    const { username, password } = await request.json()
    if (!username || !password) throw new Error('A required argument is missing.')
    const user = await database.user.findUnique({ where: { username } })
    if (!user) throw new Error(`Username '${username}' not found.`)
    if (!passwordMatches(password, user.password)) {
      throw new Error('Invalid password')
    }
    delete user.password
    const tokenExpiresIn = 30 // days
    const token = sign({ userId: user.id })
    const secure = dev ? '' : ' Secure;'
    return {
      body: {
        user,
      },
      headers: {
        'set-cookie': [
          `token=${token}; Max-Age=${tokenExpiresIn * 24 * 60 * 60}; Path=/; ${secure} HttpOnly`
        ]
      }
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
