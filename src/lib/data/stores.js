import { writable, derived } from 'svelte/store'
import { browser } from '$app/env'
import { getObjectFromStorage } from './utils.js'

export const me = writable(getObjectFromStorage('me'))
browser &&
  me.subscribe(value => {
    if (!value) return
    localStorage.me = JSON.stringify(value)
  })
