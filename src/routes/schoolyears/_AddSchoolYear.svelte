<script>
  import { schoolYears } from '$lib/data/schoolYears.js'
  import { notifications } from '$lib/notifications/index.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'

  let name
  let startDate
  let endDate

  const onReset = () => {
    name = ''
    startDate = ''
    endDate = ''
  }
  const onSubmit = async () => {
    await schoolYears.create({ name, startDate, endDate })
    notifications.add({
      type: 'success',
      text: `Added school year "${name}"`,
    })
  }

  const onError = () => {
    notifications.add({
      type: 'error',
      text: 'Something went wrong adding school year.',
    })
  }

  const currentYear = new Date().getFullYear()
  const nextYear = currentYear + 1
</script>

<h2>Add School Year</h2>

<Form {onReset} {onSubmit} {onError} submitLabel="Add">
  <Input
    bind:value={name}
    label="Name"
    description={`Try "${currentYear}-${nextYear}"`}
    required
  />
  <Input bind:value={startDate} label="Start Date" type="date" required />
  <Input bind:value={endDate} label="End Date" type="date" required />
</Form>
