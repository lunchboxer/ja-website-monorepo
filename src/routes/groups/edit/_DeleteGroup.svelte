<script>
  import { groups } from '$lib/data/groups.js'
  import { client } from '$lib/data/fetch-client.js'
  import DeleteThing from '$lib/DeleteThing.svelte'

  export let id

  const group = $groups.find(group => group.id === id)

  const deleteGroup = () => groups.remove(id)
</script>

{#if group}
  <DeleteThing
    deleteFunction={deleteGroup}
    referrer="/groups"
    thingName="group '{group.name}'"
  />
{/if}
