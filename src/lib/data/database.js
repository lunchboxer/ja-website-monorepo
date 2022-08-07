import { PrismaClient } from '@prisma/client'
// import { state } from '$lib/data/server-utils.js'

const database = new PrismaClient()

database.$use(async (parameters, next) => {
  const { model } = parameters
  let result = await next(parameters)
  if (result && model === 'User' && result?.roles) {
    result.roles = result.roles?.map(role => role.name)
  } else if (result && model === 'User' && Array.isArray(result)) {
    result = result.map(user => ({
      ...user,
      roles: user.roles.map(role => role.name),
    }))
  }
  return result
})

export { database }
