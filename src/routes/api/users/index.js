import { database } from '$lib/data/database.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ locals }) => {
  const users = await database.user.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      roles: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  return {
    body: { users },
  }
}
