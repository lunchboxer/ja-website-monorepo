<script>
  import UpcomingBirthdayNotice from '$lib/UpcomingBirthdayNotice.svelte'
  import AddStudent from './_AddStudent.svelte'
  import StudentRow from './_StudentRow.svelte'
  import { students } from '$lib/data/students.js'
  import { groups } from '$lib/data/groups.js'
</script>

<h1>Students</h1>

<UpcomingBirthdayNotice />

{#if $students?.length > 0}
  <p>There are {$students.length} students.</p>

  <div class="overflow-x-auto w-full">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Common Name</th>
          <th>Age</th>
          <th>Groups</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each $students as student}
          <StudentRow {student} />
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>There are no students yet.</p>
{/if}

{#if $groups?.length > 0}
  <AddStudent />
{:else}
  <h2>Add a student</h2>
  <p>
    There are no groups defined yet. <a href="/groups">Create one</a> first.
  </p>
{/if}
