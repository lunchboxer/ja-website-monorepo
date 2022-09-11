import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { readFileSync } from 'node:fs'
import { parse, validate, execute } from 'graphql'
import { database } from '$lib/data/database.js'
import { resolvers } from './resolvers/index.js'
import { permissions } from './permissions.js'
import lru from 'tiny-lru'
import { handleErrors } from './error-handler.js'
import typeDefs from './schema.graphql?raw'

const cache = lru(1000, 60 * 60 * 1000)

const schema = makeExecutableSchema({ typeDefs, resolvers })

const schemaWithPermissions = applyMiddleware(
  schema,
  permissions.generate(schema),
  handleErrors,
)

export async function handler(query, variables, user) {
  const cacheKey = query || ''
  const cached = cache.get(cacheKey)
  let document = cached?.document
  let validationErrors = cached?.validationErrors

  if (!document) {
    document = parse(query)
    cache.set(cacheKey, { document })
  }

  if (!validationErrors) {
    validationErrors = validate(schemaWithPermissions, document)
    cache.set(cacheKey, { document, validationErrors })
  }

  if (validationErrors.length > 0) {
    return { errors: [...validationErrors] }
  }

  const context = {
    prisma: database,
    user,
  }

  const result = await execute(
    schemaWithPermissions,
    document,
    {},
    context,
    variables,
  )
  return result
}
