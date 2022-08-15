import * as cookie from 'cookie'
import { getUserFromCookies } from '$lib/data/server-utils.js'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const cookieHeader = event.request.headers.get('cookie')
  const cookies = cookie.parse(cookieHeader ?? '')
  event.locals.user = await getUserFromCookies(cookies)
  const result = await resolve(event)
  return result
}

export function getSession(event) {
  return {
    isAuthenticated: Boolean(event.locals.user),
    me: event.locals.user,
  }
}
