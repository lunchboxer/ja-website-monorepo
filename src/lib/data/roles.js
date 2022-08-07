import { writable } from 'svelte/store'
import { client } from '$lib/data/fetch-client.js'

function createRolesStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    // Get //
    get: async () => {
      const response = await client('/api/roles', undefined, 'GET')
      response && set(response.roles)
    },
    // Create //
    create: async parameters => {
      const response = await client('/api/roles', parameters)
      update(existing => [...existing, response.role])
    },
    // Patch //
    patch: async role => {
      const response = await client(`/api/roles/${role.id}`, role, 'PATCH')
      update(existing =>
        existing.map(r => {
          if (r.id === role.id) return response.role
          return r
        }),
      )
    },
    // Remove //
    remove: async id => {
      await client(`/api/roles/${id}`, id, 'DELETE')
      update(existing => existing.filter(r => r.id !== id))
    },
  }
}

export const roles = createRolesStore()
