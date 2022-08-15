<script>
  import { groups } from '$lib/data/groups.js'
  import { schoolYears } from '$lib/data/school-years.js'
  import Warning from '$lib/Warning.svelte'
  import DeleteThing from '$lib/DeleteThing.svelte'

  export let id

  const schoolYear = $schoolYears.all.find((year) => year.id === id)

  $: groupsConnected = $groups.filter((g) => g.schoolYearId === id)

  const deleteSchoolYear = () => schoolYears.remove(id)
</script>

{#if groupsConnected?.length > 0}
  <h2>Delete School Year</h2>
  <Warning
    message={`This school year has ${groupsConnected.length} groups connected to it.
        Move these groups to another schoool year before deleting.`}
  />
{:else if groupsConnected}
  <DeleteThing
    thingName="school year '{schoolYear.name}'"
    deleteFunction={deleteSchoolYear}
    referrer="/schoolyears"
  />
{/if}
