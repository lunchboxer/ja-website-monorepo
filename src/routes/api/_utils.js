import { dev } from '$app/env'
import { database } from '$lib/data/database.js'

export async function deleteById(event, model) {
  const parameters = event.params
  try {
    const { id } = parameters
    if (!id) throw new Error('id of group is required.')
    const deleted = await database[model].delete({ where: { id } })
    return {
      body: { deleted },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}
