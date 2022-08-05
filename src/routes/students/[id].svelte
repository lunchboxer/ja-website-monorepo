<script context="module">
  export const load = ({ params }) => ({ props: { id: params.id } })
</script>

<script>
  import { getDateString, getFullAge } from '$lib/data/utils.js'
  import { students } from '$lib/data/students.js'
  import { guardians } from '$lib/data/guardians.js'
  export let id

  $: student = $students.find(s => s.id === id)
  const ageString = bdate => {
    const { years, months, days } = getFullAge(bdate)
    return `${years} yrs, ${months} m, ${days} d old`
  }
  $: studentGuardians = $guardians.filter(g =>
    g.students.some(s => s.id === id),
  )
</script>

{#if student}
  <h1>{student?.commonName}</h1>

  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr>
          <td>Common name</td>
          <td>{student.commonName}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{student.id}</td>
        </tr>
        <tr>
          <td>Chinese name</td>
          <td>{student.chineseName || '--'}</td>
        </tr>
        <tr>
          <td>Pinyin name</td>
          <td>{student.pinyinName || '--'}</td>
        </tr>
        <tr>
          <td>English name</td>
          <td>{student.englishName || '--'}</td>
        </tr>
        <tr>
          <td>Nationality</td>
          <td>{student.nationality || '--'}</td>
        </tr>
        <tr>
          <td>Languages</td>
          <td>{student.languages || '--'}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{student.gender || '--'}</td>
        </tr>
        <tr>
          <td>Birthdate</td>
          <td>{student.birthdate || '--'} ({ageString(student.birthdate)})</td>
        </tr>
        <tr>
          <td>groups</td>
          <td>
            {#each student.groups as group}
              <a href="/groups/{group.id}">{group.name}</a>
            {/each}
          </td>
        </tr>
        <tr>
          <td>guardians</td>
          <td>
            {#if studentGuardians?.length > 0}
              {#each studentGuardians as guardian}
                <a href="/groups/{guardian.id}">{guardian.name}</a>
              {/each}
            {:else}
              --
            {/if}
          </td>
        </tr>
        <tr>
          <td>created</td>
          <td>
            {getDateString(student.createdAt)}
          </td>
        </tr>
        <tr>
          <td>updated</td>
          <td>
            {getDateString(student.updatedAt)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <a class="btn" href="/students/edit/{student.id}">Edit</a>
{/if}
