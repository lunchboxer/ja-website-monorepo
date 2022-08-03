/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ locals }) => {
  const user = locals.user
  if (!user.id) return { status: 404, body: { errors: 'User not found' } }
  return {
    status: 200,
    body: {
      user,
    },
  }
}
