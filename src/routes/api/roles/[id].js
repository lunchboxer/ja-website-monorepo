import { database } from '$lib/data/database.js'
import { dev } from '$app/env'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const PATCH = async ({ request, params }) => {
  const { id } = params
  try {
    const parameters = await request.json()
    if (!parameters.name || !id) {
      throw new Error('Missing required input')
    }

    const role = await database.role.update({
      where: { id },
      data: { ...parameters },
      include: {
        users: {
          select: { id: true },
        },
      },
    })

    return {
      body: { role },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
