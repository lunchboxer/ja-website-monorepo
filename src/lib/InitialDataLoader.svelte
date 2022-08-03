<script>
  import { onMount } from 'svelte'
  import { schoolYears, school, groups, students } from '$lib/data/stores'

  onMount(async () => {
    // this could be optimized into one call
    const yearsResponse = await fetch('/api/schoolyears')
    const yearsResult = yearsResponse?.ok && (await yearsResponse.json())
    schoolYears.set({ ...$schoolYears, all: yearsResult.schoolYears })

    const schoolResponse = await fetch('/api/school')
    const schoolResult = schoolResponse?.ok && (await schoolResponse.json())
    school.set(schoolResult.school)

    const groupsResponse = await fetch('/api/groups')
    const groupsResult = groupsResponse?.ok && (await groupsResponse.json())
    groups.set(groupsResult.groups)

    const studentsResponse = await fetch('/api/students')
    const studentsResult =
      studentsResponse?.ok && (await studentsResponse.json())
    students.set(studentsResult.students)
  })
</script>
