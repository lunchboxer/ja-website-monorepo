<script>
  export let errors = ''

  const getMessage = (errors) => {
    if (!errors) return false
    return Array.isArray(errors)
      ? errors.map((error) => error.message).join('\n')
      : errors.message ?? errors
  }
</script>

{#if getMessage(errors)}
  <div class="container mb-2">
    <div class="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>Error!&nbsp;{getMessage(errors)}</span>
      </div>
    </div>
  </div>
{/if}
