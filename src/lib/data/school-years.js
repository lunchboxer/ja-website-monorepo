import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import { getObjectFromStorage } from './utils.js'
import {
  SCHOOL_YEARS,
  UPDATE_SCHOOL_YEAR,
  DELETE_SCHOOL_YEAR,
  CREATE_SCHOOL_YEAR,
} from '$graphql/school-years.gql'
import { browser } from '$app/env'

function createSchoolYearsStore() {
  const { subscribe, set, update } = writable(
    getObjectFromStorage('schoolYears'),
  )
  return {
    subscribe,
    set,
    update,
    // Get //
    get: async () => {
      const response = await request(SCHOOL_YEARS)
      response &&
        update((existing) => ({ ...existing, all: response.schoolYears }))
    },
    // Create //
    create: async (schoolYear) => {
      const response = await request(CREATE_SCHOOL_YEAR, {
        input: { ...schoolYear },
      })
      update((existing) => ({
        ...existing,
        all: [...existing.all, response.createSchoolYear],
      }))
    },
    // Set Active School Year //
    setActive: (id) => update((existing) => ({ ...existing, active: id })),
    // Remove //
    remove: async (id) => {
      // no groups can be attached at time of deletion so no need to clean up
      await request(DELETE_SCHOOL_YEAR, { id })
      update((existing) => {
        const cleanAll = existing.all.filter((y) => y.id !== id)
        if (existing.active === id) existing.active = ''
        return { ...existing, all: cleanAll }
      })
    },
    // Patch //
    patch: async (schoolYear) => {
      const { groups, createdAt, updatedAt, ...cleanSchoolYear } = schoolYear
      const response = await request(UPDATE_SCHOOL_YEAR, {
        input: { ...cleanSchoolYear },
      })
      update((existing) => {
        const all = existing.all.map((year) => {
          if (year.id !== schoolYear.id) return year
          return response.updateSchoolYear
        })
        return { ...existing, all }
      })
    },
  }
}

export const schoolYears = createSchoolYearsStore()
browser &&
  schoolYears.subscribe((value) => {
    if (!value) return
    localStorage.schoolYears = JSON.stringify(value)
  })
