<script>
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Error from '$lib/Error.svelte'
  import { roles } from '$lib/data/roles.js'

  let name = ''
  let errors = ''
  const onReset = () => {
    name = ''
    errors = ''
  }
  const onSubmit = () => {
    roles.create(name)
  }
</script>

<h2>Add role</h2>

<Error {errors} />
<Form {onReset} {onSubmit}>
  <Input label="Name" bind:value={name} />
</Form>
