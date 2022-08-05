<script>
  import { schoolYears } from '$lib/data/schoolYears.js'
  import EditIcon from '$lib/icons/EditIcon.svelte'
  export let group
  const schoolYearName = id => {
    const year = $schoolYears.all.find(year => year.id === id)
    return year.name
  }
</script>

{#if group}
  <tr>
    <th><a href="/groups/{group.id}">{group.name}</a></th>
    <td>{group.grade}</td>
    <td>{schoolYearName(group.schoolYearId)}</td>
    <td>
      <a href="/groups/edit/{group.id}" class="btn btn-ghost">
        <EditIcon />
      </a>
    </td>
  </tr>
{/if}
