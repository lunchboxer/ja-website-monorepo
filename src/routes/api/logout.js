import { dev } from '$app/env'

const secure = dev ? '' : ' Secure;'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request }) => {
  return {
    status: 200,
    headers: {
      'set-cookie': [`token=; Max-Age=0; Path=/; ${secure} HttpOnly`],
      location: '/',
    },
  }
}
