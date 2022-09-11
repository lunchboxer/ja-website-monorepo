function removeEmptyStrings(variables) {
  if (!variables) return
  for (const key of Object.keys(variables)) {
    if (typeof variables[key] === 'object') removeEmptyStrings(variables[key])
    if (variables[key] === '') {
      variables[key] = undefined
    }
  }
  return variables
}

export const request = async (query, variables, fetchFun) => {
  const fetchFunction = fetchFun || fetch
  const body =
    typeof query === 'function'
      ? query(variables)
      : JSON.stringify({ query, variables: removeEmptyStrings(variables) })
  const response = await fetchFunction('/api/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
  })
  const result = response && (await response.json())
  if (response && response.ok && !result.errors && result.data) {
    return result.data
  } else {
    throw result.errors
  }
}
