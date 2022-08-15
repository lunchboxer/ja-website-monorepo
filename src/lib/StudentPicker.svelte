<script>
  import { students } from '$lib/data/students.js'
  import StudentGroupSelect from '$lib/StudentGroupSelect.svelte'
  import Select from '$lib/Select.svelte'

  export let selectedStudent = ''
  export let groupId = ''
  export let exclude = []
  export let required = false

  $: groupStudents = $students.filter((s) => {
    if (exclude.includes(s.id)) {
      return false
    }
    const found = s.groups.find((g) => g.id === groupId)
    return !!found
  })
</script>

<StudentGroupSelect bind:groupId {required} />
{#if groupId}
  <Select label="Student" {required} bind:value={selectedStudent}>
    <option disabled selected value="">Pick a student</option>
    {#each groupStudents as student}
      <option value={student.id}>{student.commonName}</option>
    {/each}
  </Select>
{/if}
