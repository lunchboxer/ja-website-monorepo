<script>
  import { notifications } from '$lib/notifications/index.js'
  import { guardians } from '$lib/data/guardians.js'
  import { goto } from '$app/navigation'
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import DeleteThing from '$lib/DeleteThing.svelte'
  import ConnectGuardian from '../_ConnectGuardian.svelte'
  import ConnectedStudent from '../_ConnectedStudent.svelte'

  export let data
  const { id } = data
  $: guardian = $guardians && $guardians.find((g) => g.id === id)

  const onSubmit = async () => {
    await guardians.patch(guardian)
    notifications.add({
      type: 'success',
      text: `Saved guardian ${name}`,
    })
    goto('/guardians')
  }
  const onReset = () => {
    guardian = $guardians && $guardians.find((g) => g.id === id)
  }
</script>

{#if guardian}
  <h1>Edit Guardian {guardian.name}</h1>

  <Form {onSubmit} {onReset} submitLabel="save changes">
    <Input label="name" bind:value={guardian.name} required />
    <Input label="relationship" bind:value={guardian.relationship} required />
    <Input label="email" type="email" bind:value={guardian.email} />
    <Input label="phone" bind:value={guardian.phone} />
    <Input label="nationality" bind:value={guardian.nationality} />
  </Form>

  <h2>Connected students</h2>
  {#if guardian.students?.length > 0}
    {#each guardian.students as student}
      <ConnectedStudent guardianId={id} {student} />
    {/each}
  {:else}
    <p>No students connected yet.</p>
  {/if}

  <ConnectGuardian {guardian} />

  <DeleteThing
    thingName="guardian {guardian.name}"
    referrer="/guardians"
    deleteFunction={() => {
      guardians.remove(id)
    }}
  />
{:else}
  <p>loading group</p>
{/if}
