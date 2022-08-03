<script context="module">
  export async function load({ fetch }) {
    const response = await fetch('/api/schoolyears')
    const result = response?.ok && (await response.json())

    return {
      status: response.status,
      props: {
        schoolYears: result.schoolYears,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import Error from '$lib/Error.svelte'
  import ActiveSchoolYearSelect from '$lib/ActiveSchoolYearSelect.svelte'
  import AddSchoolYear from './_AddSchoolYear.svelte'
  import SchoolYearRow from './_SchoolYearRow.svelte'
  import { schoolYears as schoolYearsStore } from '$lib/data/stores.js'
  export let schoolYears
  export let errors

  schoolYearsStore.set({ ...$schoolYearsStore, all: schoolYears })
</script>

<h1>School years</h1>

<Error {errors} />

{#if $schoolYearsStore}
  {#if $schoolYearsStore.all?.length > 0}
    <p>{$schoolYearsStore.all.length} school years in system.</p>
    <ActiveSchoolYearSelect selected={$schoolYearsStore.active} />
    <div class="overflow-x-auto w-full">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each $schoolYearsStore.all as schoolYear}
            <SchoolYearRow {schoolYear} />
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  <AddSchoolYear />
{:else}
  <p>School Years not loaded.</p>
{/if}
