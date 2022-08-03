import { database } from '$lib/data/database.js'
import { commonNameUniqueInGroup } from '$lib/data/validation.js'
import { dev } from '$app/env'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const students = await database.student.findMany({
    orderBy: { commonName: 'asc' },
    include: { groups: true },
  })

  return {
    body: { students },
  }
}

export const POST = async ({ request }) => {
  try {
    const { groupId, ...parameters } = await request.json()
    if (!parameters.commonName || !groupId) {
      throw new Error('Missing required parameter')
    }
    await commonNameUniqueInGroup(parameters.commonName, groupId, database)
    const student = await database.student.create({
      data: {
        ...parameters,
        groups: {
          connect: { id: groupId },
        },
      },
      include: { groups: true },
    })
    return {
      body: { student },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
