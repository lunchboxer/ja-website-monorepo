import { database } from '$lib/data/database.js'
import { dev } from '$app/env'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const school = await database.school.findUnique({ where: { id: 1 } })
  return {
    body: { school },
  }
}
export const POST = async ({ request }) => {
  try {
    const { name, address } = await request.json()
    if (!name || !address) throw new Error('Missing required input')
    const upsertSchool = await database.school.upsert({
      where: {
        id: 1,
      },
      update: { name, address },
      create: { name, address },
    })

    return {
      body: { school: upsertSchool },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
