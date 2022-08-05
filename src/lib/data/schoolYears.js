import { writable } from 'svelte/store'
import { client } from '$lib/data/fetch-client.js'
import { getObjectFromStorage } from './utils.js'
import { browser } from '$app/env'

function createSchoolYearsStore() {
  const { subscribe, update } = writable(getObjectFromStorage('schoolYears'))
  return {
    subscribe,
    // Get //
    get: async () => {
      const response = await client('/api/schoolyears', undefined, 'GET')
      response &&
        update(existing => ({ ...existing, all: response.schoolYears }))
    },
    // Create //
    create: async parameters => {
      const response = await client('/api/schoolyears', parameters)
      update(existing => ({
        ...existing,
        all: [...existing.all, response.schoolYear],
      }))
    },
    // Set Active School Year //
    setActive: id => update(existing => ({ ...existing, active: id })),
    // Remove //
    remove: async id => {
      // no groups can be attached at time of deletion so no need to clean up
      await client(`/api/schoolyears/${id}`, id, 'DELETE')

      update(existing => {
        const cleanAll = existing.all.filter(y => y.id !== id)
        if (existing.active === id) existing.active = ''
        return { ...existing, all: cleanAll }
      })
    },
    // Patch //
    patch: async parameters => {
      const response = await client(
        `/api/schoolyears/${parameters.id}`,
        parameters,
        'PATCH',
      )
      update(existing => {
        const all = existing.all.map(year => {
          if (year.id !== parameters.id) return year
          return response.schoolYear
        })
        return { ...existing, all }
      })
    },
  }
}

export const schoolYears = createSchoolYearsStore()
browser &&
  schoolYears.subscribe(value => {
    if (!value) return
    localStorage.schoolYears = JSON.stringify(value)
  })
