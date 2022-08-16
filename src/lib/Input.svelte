<script>
  /* eslint-disable no-undef-init, unicorn/no-useless-undefined */
  let input
  export let value = undefined
  export let label = ''
  export let error = false
  export let required = false
  export let pattern = '^.+$'
  export let minlength = 1
  export let maxlength = undefined
  export let type = 'text'
  export let description = ''
  export let min = undefined
  export let max = undefined
  export let onChange = () => {}
  let show = false

  // $: name = label.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
  // name is kebab-case version of label, so labels need to be distinct
  $: name = label
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
  $: descriptionId = `description${name}`

  function checkValidity() {
    error =
      !input.validity.valid && input.validationMessage
        ? input.validationMessage
        : ''
    onChange()
  }
  const toggleShow = () => {
    if (type === 'password' && show) {
      input.type = 'text'
    } else if (!show) {
      input.type = 'password'
    }
  }
</script>

<div class="form-control my-2">
  <label class="label" for={name}>
    <span class="label-text">{label}</span>
    {#if error}
      <span class="label-text error-text">{error}</span>
    {/if}
  </label>

  {#if type === 'date'}
    <input
      bind:this={input}
      bind:value
      class="input input-bordered"
      class:input-error={error}
      type="date"
      {required}
      {name}
      {min}
      {max}
      aria-describedby={descriptionId}
      on:input={checkValidity}
      on:invalid|preventDefault={checkValidity}
    />
  {/if}
  {#if type === 'text'}
    <input
      bind:this={input}
      bind:value
      class="input input-bordered"
      class:input-error={error}
      type="text"
      {required}
      {name}
      {pattern}
      {minlength}
      {maxlength}
      aria-describedby={descriptionId}
      on:input={checkValidity}
      on:invalid|preventDefault={checkValidity}
    />
  {/if}

  {#if type === 'email'}
    <input
      bind:this={input}
      bind:value
      class="input input-bordered"
      class:input-error={error}
      type="email"
      {required}
      {name}
      {pattern}
      {minlength}
      {maxlength}
      aria-describedby={descriptionId}
      on:change={checkValidity}
      on:invalid|preventDefault={checkValidity}
    />
  {/if}
  {#if type === 'password'}
    <input
      bind:this={input}
      bind:value
      class="input input-bordered"
      class:input-error={error}
      type="password"
      {required}
      {name}
      {pattern}
      {minlength}
      {maxlength}
      aria-describedby={descriptionId}
      on:input={checkValidity}
      on:invalid|preventDefault={checkValidity}
    />
  {/if}
  {#if type === 'password' || show === true}
    <div class="form-control justify-end">
      <label class="label cursor-pointer">
        <span class="label-text">{show ? 'hide' : 'show'}</span>
        <input
          type="checkbox"
          class="toggle"
          bind:checked={show}
          on:change={toggleShow}
        />
      </label>
    </div>
  {/if}

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
