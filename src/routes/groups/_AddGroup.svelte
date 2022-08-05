<script>
  import { schoolYears } from '$lib/data/schoolYears.js'
  import { groups } from '$lib/data/groups.js'
  import { notifications } from '$lib/notifications/index.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import GradeSelect from './_GradeSelect.svelte'

  let name
  let grade

  const onSubmit = async () => {
    await groups.create({ name, grade, schoolYearId: $schoolYears.active })
    notifications.add({
      type: 'success',
      text: `Successfully added new group: ${name}`,
    })
    name = ''
    grade = ''
  }
  $: activeSchoolYear = $schoolYears.all.find(
    year => year.id === $schoolYears.active,
  )
</script>

<h2>Create a new group</h2>
<p>
  Group will be added to active school year: {activeSchoolYear?.name}
</p>

<Form {onSubmit} submitLabel="Add">
  <Input
    bind:value={name}
    label="Name"
    description="For example, 'G2B'"
    required
  />
  <GradeSelect bind:grade />
  <input hidden value={$schoolYears.active} name="schoolYearId" />
</Form>
