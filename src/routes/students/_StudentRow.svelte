<script>
  import { schoolYears } from '$lib/data/schoolYears.js'
  import { upcomingBirthdays } from '$lib/data/students.js'
  import { getAge } from '$lib/data/utils.js'
  import EditIcon from '$lib/icons/EditIcon.svelte'
  export let student

  const yearName = group => {
    const year = $schoolYears.all.find(y => y.id === group.schoolYearId)
    return year?.name
  }
  $: upcomingBday =
    $upcomingBirthdays &&
    $upcomingBirthdays.find(bday => bday.id === student.id)
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
        <a href="/groups/{group.id}">{group.name} ({yearName(group)})</a>
      {/each}
    </td>
    <td>
      <a href="/students/edit/{student.id}" class="btn btn-ghost">
        <EditIcon />
      </a>
    </td>
  </tr>
{/if}
