<script>
  import { students, groups, schoolYears } from '$lib/data/stores.js'
  import { client } from '$lib/data/fetch-client.js'
  import { notifications } from '$lib/notifications/index.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import Info from '$lib/Info.svelte'

  let commonName
  let groupId

  const onSubmit = async () => {
    const response = await client('/api/students', {
      commonName,
      groupId,
    })
    students.set([...$students, response.student])
    notifications.add({
      type: 'success',
      text: `Successfully added new student: ${commonName}`,
    })
    commonName = ''
    groupId = ''
  }

  $: activeGroups = $groups.filter(
    group => group.schoolYearId === $schoolYears.active,
  )
  $: activeSchoolYear = $schoolYears?.all?.find(
    y => y.id === $schoolYears.active,
  )
</script>

<h2>Create a new student</h2>

<Info message="New students are added to a group in the active school year." />

<Form {onSubmit} submitLabel="Add">
  <Input
    bind:value={commonName}
    label="Common name"
    description="The name the student is called in class"
    required
  />
  {#if activeGroups}
    <label class="label" for="groupSelect">
      <span class="label-text"
        >Group (school year {activeSchoolYear?.name})</span
      >
    </label>
    <select
      name="groupSelect"
      bind:value={groupId}
      class="select select-bordered w-full max-w-xs"
    >
      <option disabled value=""> Select a group </option>
      {#each activeGroups as group}
        <option value={group.id}>{group.name} (grade {group.grade})</option>
      {/each}
    </select>
  {/if}
</Form>
