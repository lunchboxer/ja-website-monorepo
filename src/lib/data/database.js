import { PrismaClient } from '@prisma/client'

export const database = new PrismaClient()

database.$use(async (parameters, next) => {
  const result = await next(parameters)
  if (parameters.model === 'User') {
    delete result.password
    if (result.roles) result.roles = result.roles.map(role => role.name)
  }
  return result
})
