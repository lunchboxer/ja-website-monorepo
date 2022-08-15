<script context="module">
  export const load = ({ params }) => ({ props: { id: params.id } })
</script>

<script>
  import { notifications } from '$lib/notifications/index.js'
  import { schoolYears } from '$lib/data/school-years.js'
  import { goto } from '$app/navigation'
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import DeleteSchoolYear from '../_DeleteSchoolYear.svelte'

  export let id
  let schoolYear = $schoolYears?.all.find((year) => year.id === id)

  const onSubmit = async () => {
    await schoolYears.patch(schoolYear)
    notifications.add({
      type: 'success',
      text: `Saved school year ${name}`,
    })
    goto('/schoolyears')
  }
  const onReset = () => {
    schoolYear = $schoolYears?.all.find((year) => year.id === id)
  }
</script>

<h1>Edit School Year</h1>

{#if schoolYear}
  <Form {onSubmit} {onReset} onError={onReset} submitLabel="Save changes">
    <Input bind:value={schoolYear.name} label="Name" required />
    <Input
      bind:value={schoolYear.startDate}
      label="Start Date"
      type="date"
      required
    />
    <Input
      bind:value={schoolYear.endDate}
      type="date"
      label="End Date"
      required
    />
  </Form>

  <DeleteSchoolYear {id} />
{/if}
