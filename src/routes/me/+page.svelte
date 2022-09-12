<script>
  export let data = {}

  import { me } from '$lib/data/me.js'
  import { getDateString } from '$lib/data/utils.js'

  me.set(data.me)

  const listGroups = (groups) => {
    return !groups?.length
      ? 'none'
      : groups.map((group) => group.name).join(', ')
  }
</script>

<svelte:head>
  <title>User Profile</title>
</svelte:head>

<h1>User Profile</h1>

{#if $me?.id}
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
        <tr>
          <td>name</td>
          <td>{$me.name || '--'}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{$me.id}</td>
        </tr>
        <tr>
          <td>username</td>
          <td>{$me.username}</td>
        </tr>
        <tr>
          <td>roles</td>
          <td>
            {$me.roles.join(', ')}
          </td>
        </tr>
        <tr>
          <td>email</td>
          <td>{$me.email || '--'}</td>
        </tr>
        <tr>
          <td>groups</td>
          <td>
            {listGroups($me.groups)}
          </td>
        </tr>
        <tr>
          <td>created</td>
          <td>
            {getDateString($me.createdAt)}
          </td>
        </tr>
        <tr>
          <td>updated</td>
          <td>
            {getDateString($me.updatedAt)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <a href="users/edit/{$me.id}" class="btn">Edit</a>
{/if}
