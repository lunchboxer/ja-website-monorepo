import { dev } from '$app/environment'

const secure = dev ? '' : ' Secure;'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST = async ({ request }) => {
  return new Response('{"message":"Logout Successful"}', {
    status: 200,
    headers: {
      'set-cookie': [`token=; Max-Age=0; Path=/; ${secure} HttpOnly`],
      location: '/',
    },
  })
}
