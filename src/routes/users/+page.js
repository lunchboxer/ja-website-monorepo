import { request } from '$graphql/client.js'
import { USERS } from '$graphql/users.gql'
export const load = async ({ fetch }) => {
  const response = await request(USERS, undefined, fetch)
  return { loadUsers: response.users }
}
