<script>
  import { schoolYears } from '$lib/data/school-years.js'
  import { activeGroups } from '$lib/data/groups.js'
  import { allGrades } from '$lib/data/constants.js'
  import Select from '$lib/Select.svelte'

  export let groupId = ''
  export let required = false

  $: activeSchoolYear = $schoolYears?.all?.find(
    (y) => y.id === $schoolYears.active,
  )
  const gradeName = (group) =>
    allGrades.find((g) => g.value === group.grade).name
</script>

{#if $activeGroups}
  <Select
    label="Group (school year {activeSchoolYear?.name})"
    bind:value={groupId}
    {required}
  >
    <option disabled value=""> Select a group </option>
    {#each $activeGroups as group}
      <option value={group.id}>{group.name} ({gradeName(group)})</option>
    {/each}
  </Select>
{/if}
