<script>
  /* eslint-disable no-undef-init, unicorn/no-useless-undefined */
  let select
  export let error = false
  export let value = undefined
  export let label = ''
  export let required = false
  export let description = ''
  export let onChange = () => {}

  $: name =
    label
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase() + '-select'
  $: descriptionId = `description${name}`

  function checkValidity() {
    error =
      !select.validity.valid && select.validationMessage
        ? select.validationMessage
        : ''
    onChange()
  }
</script>

<div class="form-control my-2">
  <label class="label" for={name}>
    <span class="label-text">
      {label}
    </span>
    {#if error}
      <span class="lable-text error-text">{error}</span>
    {/if}
  </label>
  <select
    bind:this={select}
    class:select-error={error}
    on:input={checkValidity}
    on:invalid|preventDefault={checkValidity}
    {name}
    bind:value
    class="select select-bordered"
    {required}
    on:change={onChange}
  >
    <slot />
  </select>
  {#if description}
    <label class="label" for={name}>
      <span class="label-text-alt help-text" id={descriptionId}>
        {description}
      </span>
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
