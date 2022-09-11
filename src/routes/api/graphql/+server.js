import { json } from '@sveltejs/kit'
import { handler } from '$graphql/handler.js'

/** @type {import('./graphql').RequestHandler} */
export async function POST({ request, locals }) {
  const body = await request.json()
  const result = await handler(body.query, body.variables, locals.user)
  return json(result)
}
