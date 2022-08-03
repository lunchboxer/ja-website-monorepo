<script>
  import '../app.css'
  import Header from '$lib/Header.svelte'
  import Login from '$lib/Login.svelte'
  import { me } from '$lib/data/stores.js'
  import { NotificationList } from '$lib/notifications'
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import { page } from '$app/stores'
  import SidebarNav from '$lib/SidebarNav.svelte'
  import InitialDataLoader from '$lib/InitialDataLoader.svelte'

  // sidebar binding
  let checked = ''

  onMount(() => {
    themeChange(false)
  })
</script>

<InitialDataLoader />

<div class="drawer drawer-mobile">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked />
  <div class="drawer-content flex flex-col">
    <Header />

    <div class="container prose mx-auto px-4 py-4 mt-20">
      {#if $me && !$me?.id && $page.url.pathname !== '/settings'}
        <Login />
      {:else if $me}
        <slot />
      {/if}
    </div>
  </div>
  <SidebarNav bind:checked />
</div>

<NotificationList />
