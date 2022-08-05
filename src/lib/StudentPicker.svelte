<script>
  import { students } from '$lib/data/students.js'
  import StudentGroupSelect from '$lib/StudentGroupSelect.svelte'

  export let selectedStudent = ''
  export let groupId = ''
  export let exclude = []

  $: groupStudents = $students.filter(s => {
    if (exclude.includes(s.id)) {
      return false
    }
    const found = s.groups.find(g => g.id === groupId)
    return !!found
  })
</script>

<StudentGroupSelect bind:groupId />
{#if groupId}
  <div class="form-control w-full max-w-xs">
    <label class="label" for="studentSelect">
      <span class="label-text">Student</span>
    </label>
    <select
      class="select select-bordered"
      name="studentSelect"
      bind:value={selectedStudent}
    >
      <option disabled selected value="">Pick a student</option>
      {#each groupStudents as student}
        <option value={student.id}>{student.commonName}</option>
      {/each}
    </select>
  </div>
{/if}
