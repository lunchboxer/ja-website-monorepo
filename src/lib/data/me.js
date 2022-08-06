import { writable } from 'svelte/store'
import { client } from '$lib/data/fetch-client.js'
import { getObjectFromStorage } from './utils.js'
import { browser } from '$app/env'

function createMeStore() {
  const { subscribe, set } = writable(getObjectFromStorage('me'))
  return {
    subscribe,
    login: async parameters => {
      const response = await client('/api/login', parameters)
      set(response.user)
    },
    signup: async parameters => {
      const response = await client('/api/signup', parameters)
      set(response.user)
    },
    logout: async () => {
      await client('api/logout')
      set({})
    },
    // Get //
    get: async () => {
      const response = await client('/api/me', undefined, 'GET')
      response && set(response.user)
    },
  }
}

export const me = createMeStore()
browser &&
  me.subscribe(value => {
    if (!value) return
    localStorage.me = JSON.stringify(value)
  })
