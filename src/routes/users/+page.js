import { request } from '$graphql/client.js'
import { USERS } from '$graphql/users.gql'
export const load = async ({ fetch }) => {
  try {
    const response = await request(USERS, undefined, fetch)
    return { loadUsers: response.users }
  } catch (error) {
    return { errors: error }
  }
}
