<script>
  import { students } from '$lib/data/students.js'
  import { notifications } from '$lib/notifications/index.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import Info from '$lib/Info.svelte'
  import StudentGroupSelect from '$lib/StudentGroupSelect.svelte'

  let commonName
  let username
  let groupId
  let password

  const onSubmit = async () => {
    await students.create({ commonName, groupId, username, password })
    notifications.add({
      type: 'success',
      text: `Successfully added new student: ${commonName}`,
    })
  }
  const onReset = () => {
    commonName = ''
    groupId = ''
  }

  const getGeneratedPassword = async () => {
    password = await students.generatePassword()
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
  {#await getGeneratedPassword()}
    <p>Generating password</p>
  {:then}
    <Input bind:value={password} label="Password" required />
  {/await}
  <button class="btn btn-sm" on:click={getGeneratedPassword}>generate</button>
  <Input bind:value={username} label="Username" required />
  <StudentGroupSelect bind:groupId />
</Form>
