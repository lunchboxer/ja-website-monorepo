<script>
  import { onMount } from 'svelte'
  import { guardians } from '$lib/data/guardians.js'
  import { students } from '$lib/data/students.js'
  import { school } from '$lib/data/school.js'
  import { groups } from '$lib/data/groups.js'
  import { schoolYears } from '$lib/data/schoolYears.js'
  import { me } from '$lib/data/me.js'
  import { session } from '$app/stores'
  import Loading from '$lib/Loading.svelte'

  export let ready = false
  onMount(async () => {
    // this could be optimized into one call
    me.set($session.me)
    await Promise.all([
      schoolYears.get(),
      school.get(),
      groups.get(),
      students.get(),
      guardians.get(),
    ])
    ready = true
  })
</script>

{#if !ready}
  <Loading message="Loading data" />
{/if}
