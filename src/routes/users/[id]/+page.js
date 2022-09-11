import { request } from '$graphql/client.js'
import { USER } from '$graphql/users.gql'

export async function load({ fetch, params }) {
  const variables = { id: params.id }
  const response = await request(USER, variables, fetch)
  return {
    user: response.user,
  }
}
