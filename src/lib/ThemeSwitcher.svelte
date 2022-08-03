<script>
  import SunIcon from '$lib/icons/SunIcon.svelte'
  import MoonIcon from '$lib/icons/MoonIcon.svelte'
</script>

<h3>Color theme</h3>
<div class="btn-group">
  <button class="btn gap-2" data-set-theme="light" data-act-class="btn-active">
    <SunIcon />light
  </button>
  <button
    class="btn gap-2"
    data-set-theme="dracula"
    data-act-class="btn-active"
  >
    <MoonIcon />dark
  </button>
</div>
