<script context="module">
  export async function load({ fetch, params }) {
    const response = await fetch(`/api/schoolyears/${params.id}`)
    const result = response?.ok && (await response.json())

    return {
      status: response.status,
      props: {
        schoolYear: result.schoolYear,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import { notifications } from '$lib/notifications/index.js'
  import { schoolYears as store } from '$lib/data/stores.js'
  import { client } from '$lib/data/fetch-client.js'
  import { goto } from '$app/navigation'
  import Error from '$lib/Error.svelte'
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import DeleteSchoolYear from '../_DeleteSchoolYear.svelte'

  export let schoolYear
  export let errors
  let { name, startDate, endDate, id } = schoolYear

  const onSubmit = async () => {
    // changes as PATCH
    // write response to store
    // store.set({...$store, all: {

    const response = await client(
      `/api/schoolyears/${id}`,
      {
        id,
        name,
        startDate,
        endDate,
      },
      'PATCH',
    )
    const all = $store.all.map(year => {
      if (year.id !== id) return year
      return response.schoolYear
    })
    store.set({ ...$store, all })

    notifications.add({
      type: 'success',
      text: `Saved school year ${name}`,
    })
    goto('/schoolyears')
  }
  const onReset = () => {
    ;({ name, startDate, endDate, id } = schoolYear)
  }
</script>

<h1>Edit School Year</h1>

<Error {errors} />

{#if name}
  <Form {onSubmit} {onReset} onError={onReset} submitLabel="Save changes">
    <Input bind:value={name} label="Name" required />
    <Input bind:value={startDate} label="Start Date" type="date" required />
    <Input bind:value={endDate} type="date" label="End Date" required />
  </Form>

  <DeleteSchoolYear {id} />
{/if}
