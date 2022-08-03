<script>
  import { schoolYears, groups } from '$lib/data/stores.js'
  import { client } from '$lib/data/fetch-client.js'
  import { notifications } from '$lib/notifications/index.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'

  let name
  let grade

  const onSubmit = async () => {
    const response = await client('/api/groups', {
      name,
      grade,
      schoolYearId: $schoolYears.active,
    })
    groups.set([...$groups, response.group])
    notifications.add({
      type: 'success',
      text: `Successfully added new group: ${name}`,
    })
    name = ''
    grade = ''
  }
  const activeSchoolYear = schoolYears => {
    const year = schoolYears.all.find(year => year.id === schoolYears.active)
    return year && year.name
  }
</script>

<h2>Create a new group</h2>
<p>
  Group will be added to active school year: {activeSchoolYear($schoolYears)}
</p>

<Form {onSubmit} submitLabel="Add">
  <Input
    bind:value={name}
    label="Name"
    description="For example, 'G2B'"
    required
  />
  <Input bind:value={grade} label="Grade" description="Try '2'" required />
  <input hidden value={$schoolYears.active} name="schoolYearId" />
</Form>
