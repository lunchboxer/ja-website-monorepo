import { database } from '$lib/data/database.js'
import { dev } from '$app/env'
import { checkOrder, checkConflicts } from '$lib/data/validation.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const schoolYears = await database.schoolYear.findMany({
    orderBy: { startDate: 'desc' },
  })
  return {
    body: { schoolYears },
  }
}

export const POST = async ({ request }) => {
  try {
    const { name, startDate, endDate } = await request.json()
    if (!name || !startDate || !endDate) {
      throw new Error('Missing required input')
    }
    await checkOrder(startDate, endDate, undefined, database)
    await checkConflicts(startDate, endDate, undefined, database)

    const schoolYear = await database.schoolYear.create({
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
