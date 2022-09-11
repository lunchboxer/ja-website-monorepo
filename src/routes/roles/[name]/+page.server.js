import { ROLE } from '$graphql/roles.gql'
import { handler } from '$graphql/handler.js'

export async function load({ locals, params }) {
  const response = await handler(ROLE, params, locals.user)
  return { loadRole: response.data.role }
}
