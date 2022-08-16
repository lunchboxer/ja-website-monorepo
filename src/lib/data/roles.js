import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  ROLES,
  CREATE_ROLE,
  RENAME_ROLE,
  DELETE_ROLE,
  ROLE_COUNT,
} from '$graphql/roles.gql'

function createRolesStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    update,
    set,
    // Get //
    get: async () => {
      const response = await request(ROLES)
      response && set(response.roles)
    },
    count: async () => {
      const response = await request(ROLE_COUNT)
      return response.roleCount
    },
    // Create //
    create: async (name) => {
      const response = await request(CREATE_ROLE, { name })
      update((existing) => [...existing, response.createRole])
    },
    // Patch //
    patch: async function (role) {
      // no changes are made to user relation here, those are on user store
      const { users, ...cleanRole } = role
      const response = await request(RENAME_ROLE, cleanRole)
      this.updateOne(response.renameRole)
    },
    updateOne: function (role) {
      update((existing) =>
        existing.map((r) => {
          if (r.id === role.id) return role
          return r
        }),
      )
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_ROLE, { id })
      update((existing) => existing.filter((r) => r.id !== id))
    },
  }
}

export const roles = createRolesStore()
