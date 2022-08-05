<script>
  import { students } from '$lib/data/students.js'
  import DeleteThing from '$lib/DeleteThing.svelte'

  export let id

  $: student = $students.find(s => s.id === id)

  const deleteStudent = async () => await students.remove(id)
</script>

{#if student}
  <DeleteThing
    deleteFunction={deleteStudent}
    referrer="/students"
    thingName="student '{student.commonName}'"
  />
{/if}
