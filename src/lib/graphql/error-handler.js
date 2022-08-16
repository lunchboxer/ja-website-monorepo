import { dev } from '$app/env'
import { GraphQLError } from 'graphql'

// Middle-ware to reveal expected errors and hide the rest
export const handleErrors = async (
  resolve,
  root,
  parameters,
  context,
  info,
) => {
  try {
    const result = await resolve(root, parameters, context, info)
    if (dev && result?.payload?.errors) {
      for (const error of result.payload.errors) {
        console.error(error)
      }
    }
    return result
  } catch (error) {
    dev && console.error(error)
    // Expected Error that we need to forward to client
    if (error instanceof GraphQLError) {
      throw error
    }
    return new GraphQLError(
      'Sorry, something went wrong',
      error.nodes,
      error.source,
      error.positions,
      error.path,
    )
  }
}
