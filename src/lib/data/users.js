import { writable } from 'svelte/store'
import { client } from '$lib/data/fetch-client.js'

function createUsersStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    // Get //
    get: async () => {
      const response = await client('/api/students', undefined, 'GET')
      response && set(response.students)
    },
    // Create //
    create: async parameters => {
      const response = await client('/api/students', parameters)
      update(existing => [...existing, response.student])
    },
    // Patch //
    patch: async student => {
      const { groups, guardians, createdAt, updatedAt, ...cleanStudent } =
        student
      const response = await client(
        `/api/students/${student.id}`,
        cleanStudent,
        'PATCH',
      )
      update(existing =>
        existing.map(s => {
          if (s.id === student.id) return response.student
          return s
        }),
      )
    },
    // Remove //
    remove: async id => {
      await client(`/api/students/${id}`, id, 'DELETE')
      update(existing => existing.filter(s => s.id !== id))
    },
  }
}

export const users = createUsersStore()
