<script>
  import Logo from '$lib/Logo.svelte'
  import { schoolYears, groups, students, school } from '$lib/data/stores.js'
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
  </ul>
</div>
