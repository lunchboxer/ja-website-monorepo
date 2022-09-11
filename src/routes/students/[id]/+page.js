import { request } from '$graphql/client.js'
import { STUDENT } from '$graphql/students.gql'

export async function load({ fetch, params }) {
  const variables = { id: params.id }
  const response = await request(STUDENT, variables, fetch)
  return {
    student: response.student,
  }
}
