import { dev } from '$app/env'

export const client = async (url, body, method = 'POST') => {
  const response = await fetch(url, {
    headers: {
      'content-type': 'application/json',
    },
    method,
    body: body && JSON.stringify(body),
  })
  const result = response && (await response.json())
  if (response && response.ok && !result.errors) {
    return result
  } else {
    dev && console.error(result.errors)
    throw result.errors
  }
}
