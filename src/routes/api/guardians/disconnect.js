import { database } from '$lib/data/database.js'
import { dev } from '$app/env'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const PATCH = async ({ request }) => {
  try {
    const { guardianId, studentId } = await request.json()
    if (!guardianId || !studentId) {
      throw new Error('Missing required input')
    }
    const guardian = await database.guardian.update({
      where: { id: guardianId },
      data: {
        students: {
          disconnect: { id: studentId },
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
