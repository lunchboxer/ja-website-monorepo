<script context="module">
  export async function load({ fetch }) {
    const response = await fetch('/api/me')
    const result = response?.ok && (await response.json())

    return {
      status: response.status,
      props: {
        user: result.user,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import { me } from '$lib/data/stores.js'
  import { getDateString } from '$lib/data/utils.js'
  import Error from '$lib/Error.svelte'
  export let user
  export let errors

  me.set(user)

  $: groupList = !user.groups?.length
    ? 'none'
    : user.groups.map(group => group.name).join(', ')
</script>

<h1>User Profile</h1>

<Error {errors} />

{#if user.id}
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
          <td>name</td>
          <td>{user.name}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{user.id}</td>
        </tr>
        <tr>
          <td>username</td>
          <td>{user.username}</td>
        </tr>
        <tr>
          <td>role</td>
          <td>{user.role}</td>
        </tr>
        <tr>
          <td>email</td>
          <td>{user.email || '--'}</td>
        </tr>
        <tr>
          <td>groups</td>
          <td>
            {groupList}
          </td>
        </tr>
        <tr>
          <td>created</td>
          <td>
            {getDateString(user.createdAt)}
          </td>
        </tr>
        <tr>
          <td>updated</td>
          <td>
            {getDateString(user.updatedAt)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
{/if}
