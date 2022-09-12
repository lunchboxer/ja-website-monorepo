<script>
  import AddGroup from './_AddGroup.svelte'
  import GroupRow from './_GroupRow.svelte'
  import { groups } from '$lib/data/groups.js'
  import { schoolYears } from '$lib/data/school-years.js'
  import ActiveSchoolYearSelect from '$lib/ActiveSchoolYearSelect.svelte'
</script>

<h1>Groups</h1>

{#if $groups?.length > 0}
  <p>There are {$groups.length} groups.</p>

  <div class="overflow-x-auto w-full">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Grade</th>
          <th>Schoolyear</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each $groups as group}
          <GroupRow {group} />
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>There are no groups yet.</p>
{/if}

{#if $schoolYears?.active}
  <AddGroup />
{:else}
  <h2>Create new Group</h2>
  <p>A group cannot be created without first selecting an active school year</p>
  <ActiveSchoolYearSelect />
{/if}
