<script>
  import { notifications } from '$lib/notifications/index.js'
  import { goto } from '$app/navigation'
  import Error from '$lib/Error.svelte'

  export let thingName = 'this'
  export let deleteFunction
  let errors = ''
  export let referrer = '/'

  const runDeleteFunction = async () => {
    try {
      await deleteFunction()
      errors = ''
      notifications.add({ type: 'success', text: `Deleted ${thingName}` })
      goto(referrer)
    } catch (error) {
      errors = error
      notifications.add({
        type: 'error',
        text: `Failed to delete ${thingName}`,
      })
    }
  }
</script>

<h2>Delete {thingName}</h2>

<Error {errors} />

<label for="my-modal" class="btn modal-button">Delete</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
    </label>
    <h3>
      Really delete {thingName}?
    </h3>
    <p>This action cannot be undone.</p>
    <div class="modal-action">
      <label for="my-modal" class="btn">nevermind</label>
      <label for="my-modal" class="btn btn-error" on:click={runDeleteFunction}>
        Delete
      </label>
    </div>
  </div>
</div>
