<script context="module">
  export const load = ({ params }) => ({ props: { id: params.id } })
</script>

<script>
  import { guardians } from '$lib/data/guardians.js'
  import { getDateString } from '$lib/data/utils.js'
  export let id
  $: guardian = $guardians.find(g => g.id === id)
</script>

{#if guardian}
  <h1>Guardian {guardian.name}</h1>

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
          <td>Name</td>
          <td>{guardian.name}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{guardian.id}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{guardian.email || '--'}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{guardian.phone || '--'}</td>
        </tr>
        <tr>
          <td>Nationality</td>
          <td>{guardian.nationality || '--'}</td>
        </tr>
        <tr>
          <td>Students</td>
          <td>
            {#if guardian.students?.length > 0}
              {#each guardian.students as student}
                <a href="/students/{student.id}">{student.commonName}</a>
              {/each}
            {:else}
              --
            {/if}
          </td>
        </tr>
        <tr>
          <td>created</td>
          <td>
            {getDateString(guardian.createdAt)}
          </td>
        </tr>
        <tr>
          <td>updated</td>
          <td>
            {getDateString(guardian.updatedAt)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
{:else}
  <p>loading guardian</p>
{/if}
