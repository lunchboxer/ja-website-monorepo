<script>
  import EditIcon from '$lib/icons/EditIcon.svelte'
  export let schoolYear

  const dateString = string => {
    const date = new Date(string)
    return date.toDateString()
  }
</script>

{#if schoolYear}
  <tr>
    <th>{schoolYear.name}</th>
    <td>{dateString(schoolYear.startDate)}</td>
    <td>{dateString(schoolYear.endDate)}</td>
    <td>
      <a href="/schoolyears/edit/{schoolYear.id}" class="btn btn-ghost">
        <EditIcon />
      </a>
    </td>
  </tr>
{/if}
