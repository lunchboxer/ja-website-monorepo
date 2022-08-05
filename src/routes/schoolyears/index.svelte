<script>
  import ActiveSchoolYearSelect from '$lib/ActiveSchoolYearSelect.svelte'
  import AddSchoolYear from './_AddSchoolYear.svelte'
  import SchoolYearRow from './_SchoolYearRow.svelte'
  import { schoolYears } from '$lib/data/schoolYears.js'
</script>

<h1>School years</h1>

{#if $schoolYears}
  {#if $schoolYears.all?.length > 0}
    <p>{$schoolYears.all.length} school years in system.</p>
    <ActiveSchoolYearSelect selected={$schoolYears.active} />
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
          {#each $schoolYears.all as schoolYear}
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
