<script>
  import { onMount } from 'svelte'
  import { guardians } from '$lib/data/guardians.js'
  import { students } from '$lib/data/students.js'
  import { school } from '$lib/data/school.js'
  import { groups } from '$lib/data/groups.js'
  import { schoolYears } from '$lib/data/school-years.js'
  import { me } from '$lib/data/me.js'
  import { session } from '$app/stores'
  import Loading from '$lib/Loading.svelte'

  export let ready = false
  export let data = {}
  onMount(async () => {
    // this could be optimized into one call
    me.set($session.me)
    guardians.set(data.guardians)
    school.set(data.school)
    students.set(data.students)
    groups.set(data.groups)
    schoolYears.update((existing) => {
      existing.all = data.schoolYears
      return existing
    })
    ready = true
  })
</script>

{#if !ready}
  <Loading message="Loading data" />
{/if}
