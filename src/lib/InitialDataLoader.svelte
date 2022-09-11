<script>
  import { onMount } from 'svelte'
  import { guardians } from '$lib/data/guardians.js'
  import { students } from '$lib/data/students.js'
  import { school } from '$lib/data/school.js'
  import { groups } from '$lib/data/groups.js'
  import { schoolYears } from '$lib/data/school-years.js'
  import { page } from '$app/stores'
  import { me } from '$lib/data/me.js'

  export let ready = false
  export let data = {}
  onMount(async () => {
    // this could be optimized into one call
    me.set($page.data.me)
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
