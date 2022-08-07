import { database } from '$lib/data/database.js'
import { dev } from '$app/env'
import { deleteById } from '$lib/data/server-utils.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
  const { id } = params
  try {
    const user = await database.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    })
    if (!user) throw new Error('User not found')
    delete user.password
    return {
      body: { user },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      body: { errors: error.message },
    }
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export const PATCH = async ({ request, params }) => {
  const id = params.id
  try {
    const { name, username, email } = await request.json()
    if (!id || !username) {
      throw new Error('Missing required input')
    }
    const user = await database.user.update({
      where: { id },
      data: { name, username, email },
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

/** @type {import('@sveltejs/kit').RequestHandler} */
export const DELETE = event => deleteById(event, 'user')
