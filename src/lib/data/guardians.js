import { writable } from 'svelte/store'
import { client } from '$lib/data/fetch-client.js'

function createGuardiansStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    // get  //
    get: async () => {
      const response = await client('/api/guardians', undefined, 'GET')
      response && set(response.guardians)
    },
    // create  //
    create: async parameters => {
      const response = await client('/api/guardians', parameters)
      update(existing => [...existing, response.guardian])
    },
    // remove  //
    remove: async id => {
      await client(`/api/guardians/${id}`, id, 'DELETE')
      update(existing => existing.filter(g => g.id !== id))
    },
    // patch //
    patch: async function (guardian) {
      delete guardian.students
      const response = await client(
        `/api/guardians/${guardian.id}`,
        guardian,
        'PATCH',
      )
      this.updateOne(response.guardian)
    },
    // update a single guardian after changing on the server //
    updateOne: function (guardian) {
      update(existing =>
        existing.map(g => {
          if (g.id !== guardian.id) return g
          return guardian
        }),
      )
    },
    // disconnect from student //
    disconnect: async function (guardianId, studentId) {
      const response = await client(
        '/api/guardians/disconnect',
        { guardianId, studentId },
        'PATCH',
      )
      this.updateOne(response.guardian)
    },
    // connect to student //
    connect: async function (guardianId, studentId) {
      const response = await client(
        '/api/guardians/connect',
        { guardianId, studentId },
        'PATCH',
      )
      this.updateOne(response.guardian)
    },
  }
}

export const guardians = createGuardiansStore()
