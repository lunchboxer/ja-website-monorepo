import { writable } from 'svelte/store'
import { client } from '$lib/data/fetch-client.js'
import { getObjectFromStorage } from './utils.js'
import { browser } from '$app/env'
import { session } from '$app/stores'

function createMeStore() {
  const { subscribe, set } = writable(getObjectFromStorage('me'))
  return {
    subscribe,
    login: async function (parameters) {
      const response = await client('/api/login', parameters)
      set(response.user)
      session.update(data => ({ ...data, isAuthenticated: true }))
    },
    signup: async function (parameters) {
      const response = await client('/api/signup', parameters)
      set(response.user)
      session.update(data => ({ ...data, isAuthenticated: true }))
    },
    logout: async function () {
      await client('/api/logout')
      set({})
      session.update(data => ({ ...data, isAuthenticated: false }))
    },
    // Get //
    get: async function () {
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
