<script>
  import { guardians } from '$lib/data/guardians.js'
  import { notifications } from '$lib/notifications/index.js'
  import Error from '$lib/Error.svelte'
  export let student
  export let guardianId
  export let errors = ''
  const disconnect = async student => {
    try {
      await guardians.disconnect(guardianId, student.id)
      notifications.add({
        type: 'success',
        text: `Disconnected student ${student.name} from student`,
      })
    } catch (error) {
      errors = error
    }
  }
</script>

<Error {errors} />
<p>
  {student.commonName}
  <button
    class="btn ml-4 btn-sm"
    on:click={() => {
      disconnect(student)
    }}>disconnect</button
  >
</p>
