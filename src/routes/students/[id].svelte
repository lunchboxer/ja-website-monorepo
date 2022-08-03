<script context="module">
  export async function load({ fetch, params }) {
    const response = await fetch(`/api/students/${params.id}`)
    const result = response.ok && (await response.json())
    return {
      status: response.status,
      props: {
        student: result.student,
        errors: result.errors,
      },
    }
  }
</script>

<script>
  import Error from '$lib/Error.svelte'
  export let student
  export let errors
</script>

<h1>{student?.commonName}</h1>

<Error {errors} />
