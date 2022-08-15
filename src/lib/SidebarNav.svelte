<script>
  import { guardians } from '$lib/data/guardians.js'
  import { students } from '$lib/data/students.js'
  import { groups } from '$lib/data/groups.js'
  import { schoolYears } from '$lib/data/school-years.js'
  import { school } from '$lib/data/school.js'
  import { me } from '$lib/data/me.js'
  import { users } from '$lib/data/users.js'
  import Logo from '$lib/Logo.svelte'

  export let checked = ''
</script>

<div class="drawer-side">
  <label for="my-drawer" class="drawer-overlay" />
  <ul
    class="menu p-4 overflow-y-auto w-64 bg-base-300 text-base-content"
    on:click={() => {
      checked = ''
    }}
  >
    <Logo />
    <div class="divider" />
    <!-- Sidebar content here -->
    <li class="m-1">
      <a href="/school">
        School
        {#if $school && !$school.name}
          <div class="badge badge-warning">unset</div>
        {/if}
      </a>
    </li>
    <li class="m-1">
      <a href="/schoolyears">
        School Years
        {#if $schoolYears?.all}
          <div class="badge">{$schoolYears.all.length}</div>
        {/if}
      </a>
    </li>
    <li class="m-1">
      <a href="/groups">
        Groups
        {#if $groups}
          <div class="badge">{$groups.length}</div>
        {/if}
      </a>
    </li>
    <li class="m-1">
      <a href="/students">
        Students
        {#if $students}
          <div class="badge">{$students.length}</div>
        {/if}
      </a>
    </li>
    <li class="m-1">
      <a href="/guardians">
        Guardians
        {#if $guardians}
          <div class="badge">{$guardians.length}</div>
        {/if}
      </a>
    </li>
    {#if $me?.roles?.includes('admin')}
      <li class="m-1">
        <a href="/users">
          Users
          {#if $users}
            {#await users.count() then count}
              <div class="badge">{count}</div>
            {/await}
          {/if}
        </a>
      </li>
      <li class="m-1">
        <a href="/roles"> Roles </a>
      </li>
    {/if}
  </ul>
</div>
