import { writable, derived } from 'svelte/store'
import { schoolYears } from '$lib/data/school-years.js'
import { request } from '$graphql/client.js'
import {
  GROUPS,
  CREATE_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
} from '$graphql/groups.gql'

function createGroupsStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // Get //
    get: async () => {
      const response = await request(GROUPS)
      response && set(response.groups)
    },
    // Create //
    create: async (group) => {
      const response = await request(CREATE_GROUP, group)
      update((existing) => [...existing, response.createGroup])
    },
    // Patch //
    patch: async (group) => {
      const { id, name, grade, schoolYear } = group
      const schoolYearId = schoolYear.id
      const response = await request(UPDATE_GROUP, {
        input: { id, name, grade, schoolYearId },
      })
      update((existing) => {
        return existing.map((g) => {
          if (g.id === id) return response.updateGroup
          return g
        })
      })
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_GROUP, { id })
      update((existing) => existing.filter((group) => group.id !== id))
      // should we clean up students too?
    },
  }
}

export const groups = createGroupsStore()

export const activeGroups = derived(
  [groups, schoolYears],
  ([$groups, $schoolYears]) =>
    $groups.filter((g) => {
      return g.schoolYear.id === $schoolYears.active
    }),
)
