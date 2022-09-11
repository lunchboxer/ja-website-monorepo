import { handler } from '$graphql/handler.js'
import { INITIAL_DATA } from '$graphql/initial-data.gql'

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
  const { data } = await handler(INITIAL_DATA, undefined, event.locals.user)
  return {
    me: event.locals.user,
    isAuthenticated: Boolean(event.locals.user),
    ...data,
  }
}
