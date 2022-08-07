import { writable } from 'svelte/store'
import { client } from '$lib/data/fetch-client.js'

function createUsersStore() {
  const { subscribe, set, update } = writable([])
  return {
    set,
    subscribe,
    // Get //
    get: async () => {
      const response = await client('/api/users', undefined, 'GET')
      response && set(response.users)
    },
    count: async () => {
      const response = await client('/api/users/count', undefined, 'GET')
      return response?.count?._count?.id
    },
    // Create //
    create: async parameters => {
      const response = await client('/api/users', parameters)
      update(existing => [...existing, response.user])
    },
    updateOne: function (user) {
      update(existing => {
        let sawUser = false
        const previousUsers = existing.map(u => {
          if (u.id !== user.id) return u
          sawUser = true
          return user
        })
        if (!sawUser) return [...previousUsers, user]
        return previousUsers
      })
    },
    // Patch //
    patch: async function (user) {
      const response = await client(`/api/users/${user.id}`, user, 'PATCH')
      this.updateOne(response.user)
    },
    removeRole: async function (role, userId) {
      const response = await client(
        '/api/roles/unassign',
        { role, userId },
        'PATCH',
      )
      this.updateOne(response.user)
    },
    addRole: async function (role, userId) {
      const response = await client(
        '/api/roles/assign',
        { role, userId },
        'PATCH',
      )
      this.updateOne(response.user)
    },
    // Remove //
    remove: async id => {
      await client(`/api/users/${id}`, id, 'DELETE')
      update(existing => existing.filter(u => u.id !== id))
    },
  }
}

export const users = createUsersStore()
