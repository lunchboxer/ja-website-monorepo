import { ROLES } from '$graphql/roles.gql'
import { handler } from '$graphql/handler.js'

export async function load({ locals }) {
  const response = await handler(ROLES, undefined, locals.user)
  return { loadRoles: response.data.roles }
}
