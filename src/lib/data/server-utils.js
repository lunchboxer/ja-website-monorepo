import { dev } from '$app/environment'
import { database } from '$lib/data/database.js'
import { createVerifier } from 'fast-jwt'

import 'dotenv/config'

const verify = createVerifier({ key: process.env.JWT_SECRET })

export const getUserFromCookies = async (cookies) => {
  if (!cookies.token) return
  try {
    const verifiedToken = verify(cookies.token)
    const userId = verifiedToken && verifiedToken.userId
    if (!userId) return
    // get the authenticated user from the db
    const user = await database.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    })
    if (!user) return
    delete user.password
    user.roles = user.roles.map((role) => role.name)
    return user
  } catch (error) {
    dev && console.error('getUserFromCookies error', error)
  }
}

export async function deleteById(event, model) {
  const parameters = event.params
  try {
    const { id } = parameters
    if (!id) throw new Error('id of group is required.')
    const deleted = await database[model].delete({ where: { id } })
    return {
      body: { deleted },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
