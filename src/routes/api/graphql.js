import { renderGraphiQL } from 'graphql-helix'
import { handler } from '$graphql/server.js'

/** @type {import('./graphql').RequestHandler} */
export async function GET() {
  // return renderGraphiQL({ endpoint: "/api/graphql" })
  return {
    status: 200,
    headers: { 'content-type': 'text/html' },
    body: renderGraphiQL({ endpoint: '/api/graphql' }),
  }
}

/** @type {import('./graphql').RequestHandler} */
export async function POST({ request, locals }) {
  const result = await handler(request, locals)
  const { payload, headers, status } = result

  return {
    body: { ...payload },
    status,
    headers,
  }
}
