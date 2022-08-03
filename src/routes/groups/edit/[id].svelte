<script context="module">
  export async function load({ fetch, params }) {
    const response = await fetch(`/api/groups/${params.id}`)
    const result = response.ok && (await response.json())
    return {
      status: response.status,
      props: {
        group: result.group,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import { notifications } from '$lib/notifications/index.js'
  import { groups as store, schoolYears } from '$lib/data/stores.js'
  import { client } from '$lib/data/fetch-client.js'
  import { goto } from '$app/navigation'
  import Error from '$lib/Error.svelte'
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import DeleteGroup from './_DeleteGroup.svelte'

  export let group
  export let errors
  let { name, grade, schoolYearId, id } = group

  const onSubmit = async () => {
    const response = await client(
      `/api/groups/${id}`,
      {
        id,
        name,
        grade,
        schoolYearId,
      },
      'PATCH',
    )
    const cleanStore = $store.filter(g => g.id !== id)
    store.set([...cleanStore, response.group])
    console.log($store)

    notifications.add({
      type: 'success',
      text: `Saved group ${name}`,
    })
    goto('/groups')
  }
  const onReset = () => {
    ;({ name, grade, schoolYearId } = group)
  }
</script>

<h1>Edit group</h1>

<Error {errors} />

{#if group}
  <Form {onSubmit} {onReset} onError={onReset} submitLabel="Save changes">
    <Input bind:value={name} label="Name" required />
    <Input bind:value={grade} label="Grade" required />
    <div class="form-control w-full max-w-xs">
      <label class="label" for="schoolYearSelect">
        <span class="label-text">School Year</span>
      </label>
      <select
        name="schoolYearSelect"
        bind:value={schoolYearId}
        class="select select-bordered w-full max-w-xs"
      >
        <option disabled value=""> Select a school year </option>
        {#each $schoolYears.all as schoolYear}
          <option value={schoolYear.id}>{schoolYear.name}</option>
        {/each}
      </select>
    </div>
  </Form>

  <DeleteGroup {id} />
{:else}
  <p>loading group</p>
{/if}
