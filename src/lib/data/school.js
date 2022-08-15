import { writable } from 'svelte/store'
import { getObjectFromStorage } from './utils.js'
import { browser } from '$app/env'
import { request } from '$graphql/client.js'
import { SCHOOL, UPDATE_SCHOOL } from '$graphql/school.gql'

function createSchoolStore() {
  const { subscribe, set } = writable(getObjectFromStorage('school'))
  return {
    subscribe,
    set,
    // Get //
    get: async () => {
      const response = await request(SCHOOL)
      response && set(response.school)
    },
    // Edit //
    edit: async (variables) => {
      const response = await request(UPDATE_SCHOOL, variables)
      response && set(response.updateSchool)
    },
  }
}

export const school = createSchoolStore()
browser &&
  school.subscribe((value) => {
    if (!value) return
    localStorage.school = JSON.stringify(value)
  })
