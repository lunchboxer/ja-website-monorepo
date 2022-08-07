<script>
  import { schoolYears } from '$lib/data/schoolYears.js'
  import EditButton from '$lib/EditButton.svelte'
  export let group
  const schoolYearName = id => {
    const year = $schoolYears.all.find(year => year.id === id)
    return year.name
  }
</script>

{#if group}
  <tr>
    <td><a href="/groups/{group.id}">{group.name}</a></td>
    <td>{group.grade}</td>
    <td>{schoolYearName(group.schoolYearId)}</td>
    <td>
      <EditButton url="/groups/edit/{group.id}" />
    </td>
  </tr>
{/if}
