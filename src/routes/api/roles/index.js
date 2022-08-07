import { database } from '$lib/data/database.js'
import { dev } from '$app/env'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const roles = await database.role.findMany({
    orderBy: { name: 'asc' },
    select: {
      name: true,
      users: {
        select: { id: true },
      },
    },
  })
  return {
    body: { roles },
  }
}

export const POST = async ({ request }) => {
  try {
    const { name } = await request.json()
    if (!name) {
      throw new Error('Missing required parameter')
    }
    const role = await database.role.create({
      data: { name },
      select: {
        name: true,
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
