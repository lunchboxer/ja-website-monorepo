<script>
  import { schoolYears } from '$lib/data/schoolYears.js'
  import { activeGroups } from '$lib/data/groups.js'
  import { allGrades } from '$lib/data/constants.js'

  export let groupId = ''

  $: activeSchoolYear = $schoolYears?.all?.find(
    y => y.id === $schoolYears.active,
  )
  const gradeName = group => allGrades.find(g => g.value === group.grade).name
</script>

{#if $activeGroups}
  <div class="form-control w-full max-w-xs">
    <label class="label" for="groupSelect">
      <span class="label-text">
        Group (school year {activeSchoolYear?.name})
      </span>
    </label>
    <select
      name="groupSelect"
      bind:value={groupId}
      class="select select-bordered"
    >
      <option disabled value=""> Select a group </option>
      {#each $activeGroups as group}
        <option value={group.id}>{group.name} ({gradeName(group)})</option>
      {/each}
    </select>
  </div>
{/if}
