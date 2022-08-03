<script context="module">
  export async function load({ fetch }) {
    const response = await fetch('/api/school')
    const result = response?.ok && (await response.json())

    return {
      status: response.status,
      props: {
        school: result.school,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import Error from '$lib/Error.svelte'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import { client } from '$lib/data/fetch-client.js'
  import { school as schoolStore } from '$lib/data/stores.js'
  import { notifications } from '$lib/notifications/index.js'

  export let school
  export let errors
  let name = school?.name
  let address = school?.address

  schoolStore.set(school)

  const onSubmit = async () => {
    const response = await client('/api/school', { name, address })
    schoolStore.set(response.school)
    notifications.add({
      type: 'success',
      text: `Saved changes for ${name}`,
    })
  }
  const onError = () => {
    notifications.add({
      type: 'error',
      text: 'Saving changes failed.',
    })
  }
  const onReset = () => {
    ;({ name, address } = school)
  }
</script>

<h1>School</h1>

<Error {errors} />

<Form submitLabel="Save changes" {onReset} {onSubmit} {onError}>
  <Input label="Name" bind:value={name} required />
  <Textarea label="Address" bind:value={address} required />
</Form>
