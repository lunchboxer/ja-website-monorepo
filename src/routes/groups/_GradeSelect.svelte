<script>
  import { allGrades } from '$lib/data/constants.js'
  export let grade
</script>

<div class="form-control w-full max-w-xs">
  <label class="label" for="gradeSelect">
    <span class="label-text">Grade</span>
  </label>
  <select name="gradeSelect" class="select select-bordered" bind:value={grade}>
    <option disabled selected value="">select one</option>
    {#each allGrades as grade}
      <option value={grade.value}>{grade.name}</option>
    {/each}
  </select>
</div>
