<script>
  import EditIcon from '$lib/icons/EditIcon.svelte'
  export let url = ''
  export let action = () => {}
</script>

{#if url}
  <a href={url} class="btn btn-ghost">
    <EditIcon />
  </a>
{:else}
  <button on:click={action} class="btn btn-ghost">
    <EditIcon />
  </button>
{/if}
