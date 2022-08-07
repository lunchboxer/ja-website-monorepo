<script>
  let textarea
  export let value = ''
  export let label = ''
  let error = false
  export let required = false
  export let description = ''

  $: name = label.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
  $: descriptionId = `description${name}`

  function checkValidity() {
    error =
      !textarea.validity.valid && textarea.validationMessage
        ? textarea.validationMessage
        : ''
  }
</script>

<div class="form-control">
  <label class="label" for={name}>
    <span class="label-text">{label}</span>
    {#if error}
      <span class="lable-text error-text">{error}</span>
    {/if}
  </label>
  <textarea
    bind:this={textarea}
    bind:value
    class="textarea textarea-bordered h-24"
    class:textarea-error={error}
    {required}
    {name}
    aria-describedby={descriptionId}
    on:input={checkValidity}
    on:invalid|preventDefault={checkValidity}
  />

  {#if description}
    <label class="label" for={name}>
      <span class="label-text-alt help-text" id={descriptionId}
        >{description}</span
      >
    </label>
  {/if}
</div>

<style>
  .error-text {
    font-size: 0.875rem;
    color: hsl(var(--er));
  }
  .help-text {
    font-size: 0.875rem;
    color: hsl(var(--in));
  }
</style>
