<script>
  import { guardians } from '$lib/data/guardians.js'
  import { notifications } from '$lib/notifications/index.js'
  import DeleteThing from '$lib/DeleteThing.svelte'
  import AddGuardian from '$lib/AddGuardian.svelte'
  import Error from '$lib/Error.svelte'

  export let id
  let errors = ''
  let selectedGuardian = ''

  $: studentGuardians = $guardians.filter((g) =>
    g.students?.some((s) => s.id === id),
  )
  $: remainingGuardians = $guardians.filter(
    (g) => !g.students?.some((s) => s.id === id),
  )

  const deleteGuardian = (guardianId) => guardians.remove(guardianId)
  const disconnect = async (guardian) => {
    try {
      await guardians.disconnect(guardian.id, id)
      notifications.add({
        type: 'success',
        text: `Disconnected guardian ${guardian.name} from student`,
      })
    } catch (error) {
      errors = error
    }
  }
  const connect = async (guardianId) => {
    try {
      await guardians.connect(guardianId, id)
      notifications.add({
        type: 'success',
        text: 'Connected guardian to student',
      })
      selectedGuardian = ''
    } catch (error) {
      errors = error
    }
  }
</script>

<h2>Guardians</h2>

<Error {errors} />

{#if studentGuardians?.length > 0}
  {#each studentGuardians as guardian}
    <p>
      {guardian.relationship} - {guardian.name}

      <a class="btn btn-sm ml-2" href="/guardians/edit/{guardian.id}">Edit</a>
      <button
        class="btn btn-sm"
        on:click={() => {
          disconnect(guardian)
        }}
      >
        Disconnect
      </button>
      <DeleteThing
        deleteFunction={() => {
          deleteGuardian(guardian.id)
        }}
        thingName="{guardian.relationship} - {guardian.name}"
        mini="true"
      />
    </p>
  {/each}
{:else}
  <p>No guardians connected yet.</p>{/if}

<h3>Connect existing guardian</h3>
{#if remainingGuardians?.length > 0}
  <select class="select select-bordered" bind:value={selectedGuardian}>
    <option disabled selected value="">Pick one</option>
    {#each remainingGuardians as guardian}
      <option value={guardian.id}>{guardian.name}</option>
    {/each}
  </select>
  <button
    class="btn"
    on:click={() => {
      connect(selectedGuardian)
    }}>Connect</button
  >
{:else}
  <p>No more guardians to connect.</p>
{/if}

<h3>Create new guardian record</h3>

<AddGuardian studentId={id} />
