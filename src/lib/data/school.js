import { writable } from 'svelte/store'
import { client } from '$lib/data/fetch-client.js'
import { getObjectFromStorage } from './utils.js'
import { browser } from '$app/env'

function createSchoolStore() {
  const { subscribe, set } = writable(getObjectFromStorage('school'))
  return {
    subscribe,
    // Get //
    get: async () => {
      const response = await client('/api/school', undefined, 'GET')
      response && set(response.school)
    },
    // Edit //
    edit: async parameters => {
      const response = await client('/api/school', parameters)
      response && set(response.school)
    },
  }
}

export const school = createSchoolStore()
browser &&
  school.subscribe(value => {
    if (!value) return
    localStorage.school = JSON.stringify(value)
  })
