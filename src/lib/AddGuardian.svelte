<script>
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import { guardians } from '$lib/data/guardians.js'
  import StudentPicker from '$lib/StudentPicker.svelte'
  import { notifications } from '$lib/notifications/index.js'

  export let studentId = ''
  let name = ''
  let form
  let relationship
  let nationality
  let email
  let phone
  let selectedStudent = ''

  const onSubmit = async () => {
    studentId = studentId || selectedStudent
    await guardians.create({
      studentId,
      name,
      relationship,
      nationality,
      email,
      phone,
    })
    notifications.add({ type: 'success', text: `Added ${name} as guardian` })
  }
  const onReset = () => {
    name = ''
    relationship = ''
    phone = ''
    email = ''
    nationality = ''
  }
</script>

<Form {onSubmit} {onReset} submitLabel="Add Guardian" bind:form>
  <Input label="Name" bind:value={name} required />
  <Input label="Relationship" bind:value={relationship} required />
  <Input label="Email" type="email" bind:value={email} />
  <Input label="Phone" bind:value={phone} />
  <Input label="Nationality" bind:value={nationality} />
  <input hidden value={studentId} name="studentId" />
  {#if !studentId}
    <h3>Connect new guardian to a student</h3>
    <StudentPicker bind:selectedStudent required="true" />
  {/if}
</Form>
