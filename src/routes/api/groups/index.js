import { database } from '$lib/data/database.js'
import { dev } from '$app/env'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const groups = await database.group.findMany({
    orderBy: { updatedAt: 'desc' },
  })
  return {
    body: { groups },
  }
}

export const POST = async ({ request }) => {
  try {
    const { name, grade, schoolYearId } = await request.json()
    if (!name || !grade || !schoolYearId) {
      throw new Error('Missing required input')
    }
    const group = await database.group.create({
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
