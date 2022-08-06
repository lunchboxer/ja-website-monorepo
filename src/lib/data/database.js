import { PrismaClient } from '@prisma/client'

const database = new PrismaClient()

database.$use(async (parameters, next) => {
  const result = await next(parameters)
  if (result && parameters.model === 'User') {
    delete result.password
    if (result?.roles) result.roles = result.roles.map(role => role.name)
  }
  return result
})

export { database }
