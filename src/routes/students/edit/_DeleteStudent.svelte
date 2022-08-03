<script>
  import { students } from '$lib/data/stores.js'
  import { client } from '$lib/data/fetch-client.js'
  import DeleteThing from '$lib/DeleteThing.svelte'

  export let id

  const student = $students.find(s => s.id === id)

  const deleteStudent = async () => {
    await client(`/api/students/${id}`, id, 'DELETE')
    // will need to disconnect students and teachers first, probably best to do manually
    const cleanedStudents = $students.filter(s => s.id !== id)
    students.set(cleanedStudents)
  }
</script>

{#if student}
  <DeleteThing
    deleteFunction={deleteStudent}
    referrer="/students"
    thingName="student '{student.commonName}'"
  />
{/if}
