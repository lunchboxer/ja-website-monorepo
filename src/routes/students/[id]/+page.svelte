<script>
  import { getDateString, getFullAge } from '$lib/data/utils.js'
  import { guardians } from '$lib/data/guardians.js'
  export let data = {}

  const ageString = (bdate) => {
    if (!bdate) return
    const { years, months, days } = getFullAge(bdate)
    return `${years} yrs, ${months} m, ${days} d old`
  }
  $: studentGuardians = $guardians.filter((g) =>
    g.students.some((s) => s.id === data.student.id),
  )
</script>

{#if data.student}
  <h1>{data.student?.commonName}</h1>

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
          <td>{data.student.commonName}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{data.student.id}</td>
        </tr>
        <tr>
          <td>Chinese name</td>
          <td>{data.student.chineseName || '--'}</td>
        </tr>
        <tr>
          <td>Pinyin name</td>
          <td>{data.student.pinyinName || '--'}</td>
        </tr>
        <tr>
          <td>English name</td>
          <td>{data.student.englishName || '--'}</td>
        </tr>
        <tr>
          <td>Nationality</td>
          <td>{data.student.nationality || '--'}</td>
        </tr>
        <tr>
          <td>Languages</td>
          <td>{data.student.languages || '--'}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{data.student.gender || '--'}</td>
        </tr>
        <tr>
          <td>Birthdate</td>
          <td>
            {#if data.student.birthdate}
              {data.student.birthdate} ({ageString(data.student.birthdate)})
            {:else}
              --
            {/if}
          </td>
        </tr>
        <tr>
          <td>groups</td>
          <td>
            {#each data.student.groups as group}
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
            {getDateString(data.student.createdAt)}
          </td>
        </tr>
        <tr>
          <td>updated</td>
          <td>
            {getDateString(data.student.updatedAt)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <a class="btn" href="/students/edit/{data.student.id}">Edit</a>
{/if}
