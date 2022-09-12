import { ROLES } from '$graphql/roles.gql'
import { handler } from '$graphql/handler.js'

export async function load({ locals }) {
  const response = await handler(ROLES, undefined, locals.user)
  if (response.errors) {
    return { errors: response.errors[0].message }
  }
  return { loadRoles: response.data.roles }
}
