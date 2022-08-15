import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  GUARDIANS,
  CREATE_GUARDIAN,
  UPDATE_GUARDIAN,
  DELETE_GUARDIAN,
  DISCONNECT_GUARDIAN,
  CONNECT_GUARDIAN,
} from '$graphql/guardians.gql'

function createGuardiansStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // get  //
    get: async () => {
      const response = await request(GUARDIANS)
      response && set(response.guardians)
    },
    // create  //
    create: async (guardian) => {
      const response = await request(CREATE_GUARDIAN, {
        input: { ...guardian },
      })
      update((existing) => [...existing, response.createGuardian])
    },
    // remove  //
    remove: async (id) => {
      await request(DELETE_GUARDIAN, { id })
      update((existing) => existing.filter((g) => g.id !== id))
    },
    // patch //
    patch: async function (guardian) {
      const { students, createdAt, updatedAt, ...cleanGuardian } = guardian
      const response = await request(UPDATE_GUARDIAN, {
        input: { ...cleanGuardian },
      })
      this.updateOne(response.updateGuardian)
    },
    // update a single guardian after changing on the server //
    updateOne: function (guardian) {
      update((existing) =>
        existing.map((g) => {
          if (g.id !== guardian.id) return g
          return guardian
        }),
      )
    },
    // disconnect from student //
    disconnect: async function (guardianId, studentId) {
      const response = await request(DISCONNECT_GUARDIAN, {
        guardianId,
        studentId,
      })
      this.updateOne(response.disconnectGuardian)
    },
    // connect to student //
    connect: async function (guardianId, studentId) {
      const response = await request(CONNECT_GUARDIAN, {
        guardianId,
        studentId,
      })
      this.updateOne(response.connectGuardian)
    },
  }
}

export const guardians = createGuardiansStore()
