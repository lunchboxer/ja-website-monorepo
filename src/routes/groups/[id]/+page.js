import { request } from '$graphql/client.js'
import { GROUP } from '$graphql/groups.gql'

export async function load({ fetch, params }) {
  const variables = { id: params.id }
  const response = await request(GROUP, variables, fetch)
  return {
    group: response.group,
  }
}
