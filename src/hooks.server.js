import * as cookie from 'cookie'
import { getUserFromCookies } from '$lib/data/server-utils.js'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const cookieHeader = event.request.headers.get('cookie')
  const cookies = cookie.parse(cookieHeader ?? '')
  event.locals.user = await getUserFromCookies(cookies)
  return await resolve(event)
}
