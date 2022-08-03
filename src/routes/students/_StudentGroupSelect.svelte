<script>
  import { groups, schoolYears } from '$lib/data/stores.js'

  export let groupId = ''

  $: activeGroups = $groups?.filter(
    group => group.schoolYearId === $schoolYears.active,
  )
  $: activeSchoolYear = $schoolYears?.all?.find(
    y => y.id === $schoolYears.active,
  )
</script>

{#if activeGroups}
  <div class="form-control mt-2">
    <label class="label" for="groupSelect">
      <span class="label-text"
        >Group (school year {activeSchoolYear?.name})</span
      >
    </label>
    <select
      name="groupSelect"
      bind:value={groupId}
      class="select select-bordered w-full max-w-xs"
    >
      <option disabled value=""> Select a group </option>
      {#each activeGroups as group}
        <option value={group.id}>{group.name} (grade {group.grade})</option>
      {/each}
    </select>
  </div>
{/if}
