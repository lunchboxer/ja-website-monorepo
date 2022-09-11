export async function load({ locals }) {
  return {
    me: locals.user,
  }
}
