import { database } from '$lib/data/database.js'
import { dev } from '$app/env'
import { checkOrder, checkConflicts } from '$lib/data/validation.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
  const { id } = params
  try {
    const schoolYear = await database.schoolYear.findUnique({ where: { id } })
    return {
      body: { schoolYear },
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
    const { name, startDate, endDate, id } = await request.json()
    if (!name || !startDate || !endDate || !id) {
      throw new Error('Missing required input')
    }
    await checkOrder(startDate, endDate, id, database)
    await checkConflicts(startDate, endDate, id, database)

    const schoolYear = await database.schoolYear.update({
      where: { id },
      data: { name, startDate, endDate },
    })

    return {
      body: { schoolYear },
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
    if (!id) throw new Error('id of schoolYear is required.')
    const deleted = await database.schoolYear.delete({ where: { id } })
    return {
      body: { schoolYear: deleted },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
