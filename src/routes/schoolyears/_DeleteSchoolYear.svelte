<script>
  import { schoolYears, groups } from '$lib/data/stores.js'
  import { client } from '$lib/data/fetch-client.js'
  import Warning from '$lib/Warning.svelte'
  import DeleteThing from '$lib/DeleteThing.svelte'

  export let id

  const schoolYear = $schoolYears.all.find(year => year.id === id)

  $: groupsConnected = $groups.map(
    group => group.schoolYearId === id && group.id,
  )

  const deleteSchoolYear = async () => {
    await client(`/api/schoolyears/${id}`, id, 'DELETE')
    if ($schoolYears.active === id) {
      schoolYears.set({ ...$schoolYears, active: '' })
    }
  }
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
