import * as cookie from 'cookie'
import { database } from '$lib/data/database.js'
import { getUserFromCookies } from '$lib/data/server-utils.js'

import { checkPermissions } from './permissions.js'

// export const state = {
//   oneUserExists: undefined,
// }

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // to avoid needing to implement this logic on the user create side, just check until true
  // safe to assume it remains true until a user is deleted, so reset state there.
  // if (!state.oneUserExists) {
  //   const oneUserExists = await database.user.findFirst()
  //   state.oneUserExists = Boolean(oneUserExists)
  // }
  // event.locals.oneUserExists = state.oneUserExists
  // This call averages less than 1 ms with sqlite on desktop
  // if the call were to a postgres server, like from a serverless platform it
  // would likely be a lot more expensive.
  event.locals.oneUserExists = Boolean(await database.user.findFirst())
  const cookieHeader = event.request.headers.get('cookie')
  const cookies = cookie.parse(cookieHeader ?? '')
  event.locals.user = await getUserFromCookies(cookies)
  // attempting a declarative approach to permissions
  const permissionDenied = await checkPermissions(event)
  if (permissionDenied) return permissionDenied

  const result = await resolve(event)
  return result
}

export function getSession(event) {
  return {
    oneUserExists: event.locals.oneUserExists,
    isAuthenticated: Boolean(event.locals.user),
    me: event.locals.user,
  }
}
