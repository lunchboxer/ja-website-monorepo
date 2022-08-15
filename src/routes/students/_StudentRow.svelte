<script>
  import { schoolYears } from '$lib/data/school-years.js'
  import { groups } from '$lib/data/groups.js'
  import { upcomingBirthdays } from '$lib/data/students.js'
  import { getAge } from '$lib/data/utils.js'
  import EditButton from '$lib/EditButton.svelte'
  export let student

  const yearName = (groupId) => {
    const group = $groups.find((g) => g.id === groupId)
    const year = $schoolYears.all.find((y) => y.id === group.schoolYear.id)
    return year?.name
  }
  $: upcomingBday =
    $upcomingBirthdays &&
    $upcomingBirthdays.find((bday) => bday.id === student.id)
</script>

{#if student}
  <tr>
    <td><a href="/students/{student.id}">{student.commonName}</a></td>
    <td>
      {#if student.birthdate}
        {#if upcomingBday}
          {upcomingBday.age + 1} in {upcomingBday.days} days
        {:else}
          {getAge(student.birthdate)}
        {/if}
      {:else}
        --
      {/if}
    </td>
    <td>
      {#each student.groups as group}
        <a href="/groups/{group.id}">{group.name} ({yearName(group.id)})</a>
      {/each}
    </td>
    <td>
      <EditButton url="/students/edit/{student.id}" />
    </td>
  </tr>
{/if}
