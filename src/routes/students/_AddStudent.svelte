<script>
  import { students } from '$lib/data/students.js'
  import { notifications } from '$lib/notifications/index.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import Info from '$lib/Info.svelte'
  import StudentGroupSelect from '$lib/StudentGroupSelect.svelte'

  let commonName
  let groupId

  const onSubmit = async () => {
    await students.create({ commonName, groupId })
    notifications.add({
      type: 'success',
      text: `Successfully added new student: ${commonName}`,
    })
  }
  const onReset = () => {
    commonName = ''
    groupId = ''
  }
</script>

<h2>Create a new student</h2>

<Info message="New students are added to a group in the active school year." />

<Form {onSubmit} {onReset} submitLabel="Add">
  <Input
    bind:value={commonName}
    label="Common name"
    description="The name the student is called in class"
    required
  />
  <StudentGroupSelect bind:groupId />
</Form>
