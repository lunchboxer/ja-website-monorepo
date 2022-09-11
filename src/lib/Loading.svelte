<script context="module">
  import { writable } from 'svelte/store'

  export const loading = writable('')
</script>

<script>
  import { fade } from 'svelte/transition'
</script>

{#if $loading}
  <div transition:fade={{ duration: 200 }} class="loading">
    <div class="container">
      <p class="message">{$loading}</p>
      <div class="spinny" />
    </div>
  </div>
{/if}

<style>
  .message {
    font-size: 1rem;
    margin: 0;
  }
  div.loading {
    position: fixed;
    z-index: 98;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
  .container {
    position: relative;
    text-align: center;
  }
  .spinny:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    margin-top: -100px;
    margin-left: -100px;
    border-radius: 50%;
    border: 4px solid hsl(var(--nc));
    border-top-color: hsl(var(--n));
    animation: spinner 0.8s linear infinite;
  }
</style>
