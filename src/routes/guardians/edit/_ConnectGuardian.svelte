<script>
  import StudentPicker from '$lib/StudentPicker.svelte'
  import { notifications } from '$lib/notifications/index.js'
  import { guardians } from '$lib/data/guardians.js'
  import Error from '$lib/Error.svelte'

  let selectedStudent = ''
  let errors = ''
  export let guardian
  let groupId

  const connect = async () => {
    try {
      await guardians.connect(guardian.id, selectedStudent)
      notifications.add({
        type: 'success',
        text: 'Connected guardian to student',
      })
    } catch (error) {
      errors = error
    }
    selectedStudent = ''
    groupId = ''
  }
  $: exclude = guardian.students.map(s => s.id)
</script>

<h2>Connect to a student</h2>

<Error {errors} />

<StudentPicker bind:selectedStudent bind:groupId {exclude} />
{#if selectedStudent}
  <p>
    <button class="btn" on:click={connect}>Connect</button>
  </p>
{/if}
