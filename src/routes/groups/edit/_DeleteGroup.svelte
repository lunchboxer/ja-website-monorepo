<script>
  import { groups } from '$lib/data/stores.js'
  import { client } from '$lib/data/fetch-client.js'
  import DeleteThing from '$lib/DeleteThing.svelte'

  export let id

  const group = $groups.find(group => group.id === id)

  const deleteGroup = async () => {
    await client(`/api/groups/${id}`, id, 'DELETE')
    // will need to disconnect students and teachers first, probably best to do manually
    const cleanedGroups = $groups.filter(group => group.id !== id)
    groups.set(cleanedGroups)
  }
</script>

{#if group}
  <DeleteThing
    deleteFunction={deleteGroup}
    referrer="/groups"
    thingName="group '{group.name}'"
  />
{/if}
