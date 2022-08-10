<script>
  import { notifications } from '$lib/notifications/index.js'
  import { nanoid } from 'nanoid'
  import { goto } from '$app/navigation'
  import Error from '$lib/Error.svelte'

  export let thingName = 'this'
  export let deleteFunction = () => {}
  export let mini = false
  let errors = ''
  export let referrer = ''
  const modalId = 'modal' + nanoid(10)

  const runDeleteFunction = async () => {
    try {
      await deleteFunction()
      errors = ''
      notifications.add({ type: 'success', text: `Deleted ${thingName}` })
      referrer && goto(referrer)
    } catch (error) {
      errors = error
      notifications.add({
        type: 'error',
        text: `Failed to delete ${thingName}`,
      })
    }
  }
</script>

{#if mini}
  <label for={modalId} class="btn modal-button btn-sm">Delete</label>
{:else}
  <h2>Delete {thingName}</h2>

  <Error {errors} />
  <label for={modalId} class="btn modal-button">Delete</label>
{/if}

<input type="checkbox" id={modalId} class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <label for={modalId} class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <h3>
      Really delete {thingName}?
    </h3>
    <p>This action cannot be undone.</p>
    <div class="modal-action">
      <label for={modalId} class="btn">nevermind</label>
      <label for={modalId} class="btn btn-error" on:click={runDeleteFunction}>
        Delete
      </label>
    </div>
  </div>
</div>
