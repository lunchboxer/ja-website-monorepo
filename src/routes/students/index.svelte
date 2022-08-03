<script context="module">
  export async function load({ fetch }) {
    const response = await fetch('/api/students')
    const result = response?.ok && (await response.json())

    return {
      status: response.status,
      props: {
        students: result.students,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import Error from '$lib/Error.svelte'
  import UpcomingBirthdayNotice from '$lib/UpcomingBirthdayNotice.svelte'
  import AddStudent from './_AddStudent.svelte'
  import StudentRow from './_StudentRow.svelte'
  import { students as store } from '$lib/data/stores.js'
  export let students
  export let errors

  if (students) {
    store.set(students)
  }
  $: console.log($store)
</script>

<h1>Students</h1>

<Error {errors} />

<UpcomingBirthdayNotice />

{#if $store?.length > 0}
  <p>There are {$store.length} students.</p>

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
        {#each $store as student}
          <StudentRow {student} />
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>There are no students yet.</p>
{/if}

<AddStudent />
