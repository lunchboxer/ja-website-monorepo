import { database } from '$lib/data/database.js'
import { dev } from '$app/env'
import { deleteById } from '../_utils.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
  const { id } = params
  try {
    const guardian = await database.guardian.findUnique({
      where: { id },
      include: { students: true },
    })
    return {
      body: { guardian },
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
    const { id, ...parameters } = await request.json()
    if (!parameters.name || !parameters.relationship || !id) {
      throw new Error('Missing required input')
    }

    const guardian = await database.guardian.update({
      where: { id },
      data: { ...parameters },
      include: { students: true },
    })

    return {
      body: { guardian },
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
export const DELETE = event => deleteById(event, 'guardian')
