<script>
  import EditIcon from '$lib/icons/EditIcon.svelte'

  export let guardian
</script>

{#if guardian}
  <tr>
    <th><a href="/guardians/{guardian.id}">{guardian.name}</a></th>
    <td />
    <td />
    <td>
      <a href="/guardians/edit/{guardian.id}" class="btn btn-ghost">
        <EditIcon />
      </a>
    </td>
  </tr>
{/if}
