<script>
  import EditButton from '$lib/EditButton.svelte'
  export let schoolYear

  const dateString = string => {
    const date = new Date(string)
    return date.toDateString()
  }
</script>

{#if schoolYear}
  <tr>
    <td>{schoolYear.name}</td>
    <td>{dateString(schoolYear.startDate)}</td>
    <td>{dateString(schoolYear.endDate)}</td>
    <td>
      <EditButton url="/schoolyears/edit/{schoolYear.id}" />
    </td>
  </tr>
{/if}
