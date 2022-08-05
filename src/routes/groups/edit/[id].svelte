<script context="module">
  export const load = ({ params }) => ({ props: { id: params.id } })
</script>

<script>
  import { notifications } from '$lib/notifications/index.js'
  import { schoolYears } from '$lib/data/schoolYears.js'
  import { groups } from '$lib/data/groups.js'
  import { goto } from '$app/navigation'
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import DeleteGroup from './_DeleteGroup.svelte'
  import GradeSelect from '../_GradeSelect.svelte'

  export let id

  let group = $groups.find(s => s.id === id)

  const onSubmit = async () => {
    await groups.patch(group)
    notifications.add({
      type: 'success',
      text: `Saved group ${group.name}`,
    })
    goto('/groups')
  }
  const onReset = () => {
    group = $groups.find(s => s.id === id)
  }
</script>

<h1>Edit group</h1>

{#if group}
  <Form {onSubmit} {onReset} onError={onReset} submitLabel="Save changes">
    <Input bind:value={group.name} label="Name" required />
    <GradeSelect bind:grade={group.grade} />
    <div class="form-control w-full max-w-xs">
      <label class="label" for="schoolYearSelect">
        <span class="label-text">School Year</span>
      </label>
      <select
        name="schoolYearSelect"
        bind:value={group.schoolYearId}
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
