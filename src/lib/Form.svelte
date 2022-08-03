<script>
  import { notifications } from '$lib/notifications'
  import Error from '$lib/Error.svelte'

  let form

  let errors = ''
  let disabled = false
  let loading = false
  export let action = ''
  export let method = 'POST'
  export let submitLabel = 'Submit'
  export let onSubmit = () => {}
  export let onReset = () => {}
  export let onError = () => {}

  const submit = async () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'error',
      })
      return
    }
    loading = true
    disabled = true
    try {
      await onSubmit()
      errors = ''
    } catch (error) {
      errors = error
      onError(error)
    } finally {
      loading = false
      disabled = false
    }
  }

  const reset = () => {
    onReset()
    errors = ''
  }
</script>

<Error {errors} />
<form
  bind:this={form}
  novalidate
  on:submit|preventDefault={submit}
  on:reset|preventDefault={reset}
  {action}
  {method}
>
  <fieldset {disabled}>
    <slot />
    <p>
      <button type="reset" class="btn btn-outline btn-error"
        >🗙 &nbsp;reset</button
      >
      <button type="submit" class="btn btn-outline btn-success">
        ✓ &nbsp;{submitLabel}
      </button>
    </p>
  </fieldset>
</form>
