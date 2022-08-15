<script context="module">
  import { writable } from 'svelte/store'
  import { browser } from '$app/env'

  const defaultTheme = 'dracula'

  const createThemeStore = () => {
    let initial = browser && localStorage.getItem('theme')
    initial = initial || defaultTheme
    const { subscribe, set } = writable(initial)
    return {
      subscribe,
      set,
    }
  }

  export const theme = createThemeStore()

  export const themeSwitcher = (theme) => {
    if (theme !== 'light' && theme !== 'dracula') return
    if (!browser) return
    localStorage.theme = theme
    document.documentElement.dataset.theme = theme
  }
</script>

<script>
  import SunIcon from '$lib/icons/SunIcon.svelte'
  import MoonIcon from '$lib/icons/MoonIcon.svelte'
</script>

<h3>Color theme</h3>
<div class="btn-group">
  <button
    class="btn gap-2"
    on:click={() => {
      theme.set('light')
    }}
    class:btn-active={$theme === 'light'}
  >
    <SunIcon />light
  </button>
  <button
    class="btn gap-2"
    on:click={() => {
      theme.set('dracula')
    }}
    class:btn-active={$theme === 'dracula'}
  >
    <MoonIcon />dark
  </button>
</div>
