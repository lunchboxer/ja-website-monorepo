import { writable, derived } from 'svelte/store'
import { schoolYears } from '$lib/data/schoolYears.js'
import { client } from '$lib/data/fetch-client.js'

function createGroupsStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    // Get //
    get: async () => {
      const response = await client('/api/groups', undefined, 'GET')
      response && set(response.groups)
    },
    // Create //
    create: async parameters => {
      const response = await client('/api/groups', parameters)
      update(existing => [...existing, response.group])
    },
    // Patch //
    patch: async parameters => {
      const response = await client(
        `/api/groups/${parameters.id}`,
        parameters,
        'PATCH',
      )
      update(existing =>
        existing.map(group => {
          if (group.id === parameters.id) return response.group
          return group
        }),
      )
    },
    // Remove //
    remove: async id => {
      await client(`/api/groups/${id}`, id, 'DELETE')
      update(existing => existing.filter(group => group.id !== id))
      // should we clean up students too?
    },
  }
}

export const groups = createGroupsStore()

export const activeGroups = derived(
  [groups, schoolYears],
  ([$groups, $schoolYears]) =>
    $groups.filter(g => {
      return g.schoolYearId === $schoolYears.active
    }),
)
