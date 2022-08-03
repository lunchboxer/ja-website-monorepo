import { database } from '$lib/data/database.js'
import { dev } from '$app/env'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
  const { id } = params
  try {
    const group = await database.group.findUnique({ where: { id } })
    return {
      body: { group },
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
export const PATCH = async ({ request }) => {
  try {
    const { name, grade, schoolYearId, id } = await request.json()
    if (!name || !grade || !schoolYearId || !id) {
      throw new Error('Missing required input')
    }

    const group = await database.group.update({
      where: { id },
      data: { name, grade, schoolYearId },
    })

    return {
      body: { group },
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
export const DELETE = async ({ params }) => {
  try {
    const { id } = params
    if (!id) throw new Error('id of group is required.')
    const deleted = await database.group.delete({ where: { id } })
    return {
      body: { group: deleted },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
