import lru from 'tiny-lru'
import { applyMiddleware } from 'graphql-middleware'
import { getGraphQLParameters, processRequest } from 'graphql-helix'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { readFileSync } from 'node:fs'
import { parse as parseIt, validate as validateIt } from 'graphql'
import { database } from '$lib/data/database.js'
import { resolvers } from './resolvers/index.js'
import { permissions } from './permissions.js'
import { handleErrors } from './error-handler.js'

const cache = lru(1000, 60 * 60 * 1000)

const typeDefs = [
  readFileSync(new URL('schema.graphql', import.meta.url), 'utf8').toString(),
]

const schema = makeExecutableSchema({ typeDefs, resolvers })
const schemaWithPermissions = applyMiddleware(
  schema,
  permissions.generate(schema),
  handleErrors,
)

export async function handler(originalRequest, locals) {
  // Determine whether we should render GraphiQL instead of returning an API response
  const body = await originalRequest.json()
  const request = {
    body,
    headers: originalRequest.headers,
    method: originalRequest.method,
    query: originalRequest.url.searchParams,
  }
  const { operationName, query, variables } = getGraphQLParameters(request)
  const cacheKey = query || ''
  const cached = cache.get(cacheKey)
  let document = cached?.document
  let validationErrors = cached?.validationErrors

  const parse = (source, options) => {
    if (!document) {
      document = parseIt(source, options)
      cache.set(cacheKey, { document })
    }
    return document
  }

  const validate = (schema, documentAST, rules, typeInfo, options) => {
    if (!validationErrors) {
      validationErrors = validateIt(
        schema,
        documentAST,
        rules,
        typeInfo,
        options,
      )
      cache.set(cacheKey, { document, validationErrors })
    }
    return validationErrors
  }

  const contextFactory = async () => ({
    request,
    prisma: database,
    user: locals.user,
  })

  return await processRequest({
    operationName,
    query,
    variables,
    request,
    schema: schemaWithPermissions,
    parse,
    validate,
    contextFactory,
  })
}
