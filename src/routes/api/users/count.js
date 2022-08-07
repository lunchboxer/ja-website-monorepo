import { database } from '$lib/data/database.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
  const count = await database.user.aggregate({
    _count: { id: true },
  })
  return {
    body: { count },
  }
}
