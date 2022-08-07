import { dev } from '$app/env'

export const or = array => event => {
  for (const checkerFunction of array) {
    if (checkerFunction(event)) return true
  }
  return false
}

export const and = array => event => {
  for (const checkerFunction of array) {
    if (!checkerFunction(event)) return false
  }
  return true
}

// return true on permission check rejection
async function findAndCall(key, branch, event) {
  return (
    key in branch &&
    typeof branch[key] === 'function' &&
    !(await branch[key](event))
  )
}

export const shield = (permissionsSchema, apiPrefix) => async event => {
  const authError = new Response(JSON.stringify({ errors: 'Not Authorized!' }))
  if (!event.url.pathname.startsWith('/api')) return false
  const { method } = event.request
  const path = event.url.pathname.replace(apiPrefix, '')?.split('/')
  try {
    if (await findAndCall('any', permissionsSchema, event)) return authError
    if (path[0] in permissionsSchema) {
      const branch = permissionsSchema[path[0]]
      if (await findAndCall('any', branch, event)) return authError
      if (await findAndCall(method, branch, event)) return authError
    }
  } catch (error) {
    dev && console.error('permissions error', error.message)
    return authError
  }
  return false
}
