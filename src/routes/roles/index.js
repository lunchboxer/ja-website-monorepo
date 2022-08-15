import { ROLES } from '$graphql/roles.gql'
import { handler } from '$graphql/handler.js'

export async function GET({ locals }) {
  try {
    const response = await handler(ROLES, undefined, locals.user)
    return {
      body: { roles: response.data.roles },
    }
  } catch (error) {
    return {
      body: { errors: error },
    }
  }
}
