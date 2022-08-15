import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  USERS,
  USER_COUNT,
  DELETE_USER,
  UPDATE_USER,
  CREATE_USER,
  ASSIGN_ROLE,
  UNASSIGN_ROLE,
} from '$graphql/users.gql'

function createUsersStore() {
  const { subscribe, set, update } = writable([])
  return {
    set,
    subscribe,
    // Get //
    get: async () => {
      const response = await request(USERS)
      response && set(response.users)
    },
    count: async () => {
      const response = await request(USER_COUNT)
      return response.userCount
    },
    // Create //
    create: async (user) => {
      const response = await request(CREATE_USER, { input: { ...user } })
      update((existing) => [...existing, response.createUser])
    },
    updateOne: function (user) {
      update((existing) => {
        let sawUser = false
        const previousUsers = existing.map((u) => {
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
      const { id, username, email, name } = user
      // probably need to clean user object before sending
      const response = await request(UPDATE_USER, {
        input: { id, username, email, name },
      })
      this.updateOne(response.updateUser)
    },
    unassignRole: async function (role, userId) {
      const response = await request(UNASSIGN_ROLE, { role, userId })
      this.updateOne(response.unassignRole)
    },
    assignRole: async function (role, userId) {
      const response = await request(ASSIGN_ROLE, { role, userId })
      this.updateOne(response.assignRole)
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_USER, { id })
      update((existing) => existing.filter((u) => u.id !== id))
    },
  }
}

export const users = createUsersStore()
