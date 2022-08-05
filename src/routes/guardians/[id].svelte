<script context="module">
  export async function load({ fetch, params }) {
    const response = await fetch(`/api/groups/${params.id}`)
    const result = response.ok && (await response.json())
    return {
      status: response.status,
      props: {
        group: result.group,
      },
    }
  }
</script>

<script>
  export let group
</script>

{#if group}
  <h1>Group {group.name}</h1>
  <span>Grade {group.grade}</span>
{:else}
  <p>loading group</p>
{/if}
