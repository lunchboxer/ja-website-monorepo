import { ROLE } from '$graphql/roles.gql'
import { handler } from '$graphql/handler.js'

export async function GET({ locals, params }) {
  try {
    const response = await handler(ROLE, params, locals.user)
    return {
      body: { loadRole: response.data.role },
    }
  } catch (error) {
    return {
      body: { errors: error },
    }
  }
}
