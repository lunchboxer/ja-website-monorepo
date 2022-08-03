import * as cookie from 'cookie'
import { database } from '$lib/data/database.js'
import { createVerifier } from 'fast-jwt'
import { dev } from '$app/env'

const verify = createVerifier({ key: process.env.JWT_SECRET })

const getUserFromCookies = async cookies => {
  if (!cookies.token) return
  try {
    const verifiedToken = verify(cookies.token)
    const userId = verifiedToken && verifiedToken.userId
    if (!userId) return
    // get the authenticated user from the db
    const user = await database.user.findUnique({ where: { id: userId } })
    delete user.password
    return user
  } catch (error) {
    dev && console.error(error)
  }
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const cookieHeader = event.request.headers.get('cookie')
  const cookies = cookie.parse(cookieHeader ?? '')
  event.locals.user = await getUserFromCookies(cookies)
  return await resolve(event)
}
