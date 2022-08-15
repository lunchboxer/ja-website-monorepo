<script context="module">
  import { request } from '$graphql/client.js'
  import { INITIAL_DATA } from '$graphql/initial-data.gql'

  export async function load(event) {
    const result = await request(INITIAL_DATA, undefined, event)
    return { props: { data: result } }
  }
</script>

<script>
  import '../app.css'
  import Header from '$lib/Header.svelte'
  import Login from '$lib/Login.svelte'
  import { NotificationList } from '$lib/notifications'
  import { themeSwitcher, theme } from '$lib/ThemeSwitcher.svelte'
  import { page, session } from '$app/stores'
  import SidebarNav from '$lib/SidebarNav.svelte'
  import InitialDataLoader from '$lib/InitialDataLoader.svelte'

  export let data = {}
  // sidebar binding
  let checked = ''
  let ready = false

  $: themeSwitcher($theme)
</script>

{#if $session.isAuthenticated}
  <InitialDataLoader bind:ready {data} />
{/if}

<div class="drawer drawer-mobile">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked />
  <div class="drawer-content flex flex-col">
    <Header />

    <div class="container prose mx-auto px-4 py-4 mt-20">
      {#if !$session.isAuthenticated && $page.url.pathname !== '/settings'}
        <Login />
      {:else if $session.isAuthenticated && ready}
        <slot />
      {/if}
    </div>
  </div>
  {#if $session.isAuthenticated}
    <SidebarNav bind:checked />
  {/if}
</div>

<NotificationList />
