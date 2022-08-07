<script>
  import { me } from '$lib/data/me.js'
  import { getDateString } from '$lib/data/utils.js'

  const groupList = !$me.groups?.length
    ? 'none'
    : $me.groups.map(group => group.name).join(', ')
</script>

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
            {#each $me.roles as role}
              <span>{role}</span>
            {/each}
          </td>
        </tr>
        <tr>
          <td>email</td>
          <td>{$me.email || '--'}</td>
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
{/if}
