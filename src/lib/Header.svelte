<script>
  import { me } from '$lib/data/me.js'
  import { notifications } from '$lib/notifications'
  import { goto } from '$app/navigation'
  import Logo from '$lib/Logo.svelte'
  import MenuDotsIcon from '$lib/icons/MenuDotsIcon.svelte'
  import MenuHamburgerIcon from '$lib/icons/MenuHamburgerIcon.svelte'
  import ProfileIcon from '$lib/icons/ProfileIcon.svelte'
  import SettingsIcon from '$lib/icons/SettingsIcon.svelte'
  import LogoutIcon from '$lib/icons/LogoutIcon.svelte'

  const logout = async () => {
    if (!$me?.id) {
      notifications.add({
        text: 'Cannot log out. User not logged in.',
        type: 'error',
      })
      return
    }
    const username = $me.username
    await me.logout()
    notifications.add({
      text: `Logged out ${username}`,
      type: 'success',
    })
    goto('/')
  }
</script>

<nav class="navbar bg-base-100 lg:hidden">
  <div class="navbar-start">
    <div class="flex-none lg:hidden">
      <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
        <MenuHamburgerIcon />
      </label>
    </div>
  </div>
  <div class="navbar-center">
    <div class="lg:hidden w:100">
      <Logo />
    </div>
  </div>
  <div class="navbar-end">
    <div class="dropdown dropdown-end">
      <label for="user-menu" tabindex="0" class="btn btn-square btn-ghost">
        <MenuDotsIcon />
      </label>
      <ul
        tabindex="0"
        id="user-menu"
        class="menu dropdown-content p-2 mt-4 shadow bg-base-300 rounded-box"
      >
        {#if $me?.id}
          <li>
            <a href="/me"><ProfileIcon />Profile</a>
          </li>
        {/if}
        <li><a href="/settings"><SettingsIcon />Settings</a></li>
        {#if $me?.id}
          <li><button on:click={logout}><LogoutIcon />Logout</button></li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    z-index: 99;
  }
</style>
