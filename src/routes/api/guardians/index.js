import { database } from '$lib/data/database.js'
import { dev } from '$app/env'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const guardians = await database.guardian.findMany({
    orderBy: { name: 'asc' },
    include: { students: true },
  })
  return {
    body: { guardians },
  }
}

export const POST = async ({ request }) => {
  try {
    const { studentId, ...parameters } = await request.json()
    if (!parameters.name || !studentId || !parameters.relationship) {
      throw new Error('Missing required input')
    }
    const guardian = await database.guardian.create({
      data: {
        ...parameters,
        students: {
          connect: { id: studentId },
        },
      },
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
