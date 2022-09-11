<script>
  export let data
</script>

{#if data.group}
  <h1>Group {data.group.name}</h1>
  <span>Grade {data.group.grade}</span>
{:else}
  <p>loading group</p>
{/if}
