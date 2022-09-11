import { request } from '$graphql/client.js'
import { USER } from '$graphql/users.gql'
export const load = async ({ params, fetch }) => {
  const response = await request(USER, { id: params.id }, fetch)
  return { loadUser: response.user }
}
