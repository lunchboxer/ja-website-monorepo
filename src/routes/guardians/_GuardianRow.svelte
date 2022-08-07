<script>
  import EditButton from '$lib/EditButton.svelte'

  export let guardian
</script>

{#if guardian}
  <tr>
    <td><a href="/guardians/{guardian.id}">{guardian.name}</a></td>
    <td>{guardian.relationship}</td>
    <td>
      {#if guardian.students?.length > 0}
        {#each guardian.students as student}
          <a href="/students/{student.id}">{student.commonName}</a>
        {/each}
      {:else}
        --
      {/if}
    </td>
    <td>
      <EditButton url="/guardians/edit/{guardian.id}" />
    </td>
  </tr>
{/if}
