import { database } from '$lib/data/database.js'
import { dev } from '$app/env'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const PATCH = async ({ request }) => {
  try {
    const { role, userId } = await request.json()
    if (!role || !userId) {
      throw new Error('Missing required input')
    }
    const user = await database.user.update({
      where: { id: userId },
      data: {
        roles: {
          disconnect: { name: role },
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
