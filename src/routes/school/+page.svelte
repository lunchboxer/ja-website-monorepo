<script>
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import { school } from '$lib/data/school.js'
  import { goto } from '$app/navigation'
  import { notifications } from '$lib/notifications/index.js'

  let name = $school?.name
  let address = $school?.address

  const onSubmit = async () => {
    await school.edit({ name, address })
    notifications.add({
      type: 'success',
      text: `Saved changes for ${name}`,
    })
    goto('/')
  }
  const onError = () => {
    notifications.add({
      type: 'error',
      text: 'Saving changes failed.',
    })
  }
  const onReset = () => {
    name = $school?.name
    address = $school?.address
  }
</script>

<h1>School</h1>

<Form submitLabel="Save changes" {onReset} {onSubmit} {onError}>
  <Input label="Name" bind:value={name} required />
  <Textarea label="Address" bind:value={address} required />
</Form>
