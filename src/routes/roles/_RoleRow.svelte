<script>
  import DeleteThing from '$lib/DeleteThing.svelte'
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte'
  import { roles } from '$lib/data/roles.js'
  import EditIcon from '$lib/icons/EditIcon.svelte'

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  let success = false
  export let role = {}
  let edit = false
  const deleteFunction = () => roles.remove(role.id)
  const rename = async () => {
    await roles.patch(role)
    success = true
    await sleep(1000)
    success = false
  }
</script>

<tr>
  <td>
    {#if edit}
      <input
        type="text"
        bind:value={role.name}
        on:change={rename}
        class="input input-bordered input-sm w-32"
        class:input-success={success}
      />
    {:else}
      <a href="/roles/{role.name}">{role.name}</a>
    {/if}
  </td>
  <td>
    {role.users.length}
  </td>
  <td>
    <button class="btn btn-ghost" on:click={() => (edit = !edit)}>
      <EditIcon />
    </button>
  </td>
  <td>
    <DeleteThing thingName="role '{role.name}'" icon {deleteFunction}>
      <DeleteIcon fill="hsl(var(--bc))" />
    </DeleteThing>
  </td>
</tr>
