<script>
  import { notifications } from '$lib/notifications'
  import Error from '$lib/Error.svelte'
  import { dev } from '$app/environment'

  let form

  let restart = 1
  let errors = ''
  let disabled = false
  let loading = false
  export let action = ''
  export let method = 'POST'
  export let submitLabel = 'Submit'
  export let onSubmit = () => {}
  export let onReset = () => {}
  export let onError = () => {
    notifications.add({ type: 'error', text: 'Something went wrong.' })
  }

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
    ++restart
    try {
      await onSubmit()
      errors = ''
      form && form.reset() // component may have unmounted by this time
    } catch (error) {
      dev && console.error(error)
      errors = error
      onError(error)
    } finally {
      loading = false
      disabled = false
    }
  }

  const reset = () => {
    ++restart
    onReset()
    errors = ''
    form.reset()
    form.setAttribute('isValid', true)
  }
</script>

<Error {errors} />

<form
  bind:this={form}
  on:submit|preventDefault={submit}
  on:reset|preventDefault={reset}
  {action}
  {method}
>
  <fieldset {disabled}>
    {#key restart}
      <slot />
    {/key}
    <p>
      <button type="reset" class="btn btn-outline btn-error"
        >&#10005; &nbsp;reset</button
      >
      <button type="submit" class="btn btn-outline btn-success">
        ✓ &nbsp;{submitLabel}
      </button>
    </p>
  </fieldset>
</form>
