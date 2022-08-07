import { or, shield } from './shield.js'

const apiPrefix = '/api/'

// each function describes a condition and returns true if met
const isAdmin = event => event.locals.user?.roles?.includes('admin')
const noUsersExist = event => !event.locals.oneUserExists

// Assign permissions checks to run on certain paths
//
const permissionsSchema = {
  users: {
    any: isAdmin,
  },
  signup: {
    any: or([isAdmin, noUsersExist]),
  },
  students: {
    DELETE: isAdmin,
  },
}

// Returns false if no permission check failures
// Returns an error Response object if checks fail
export const checkPermissions = shield(permissionsSchema, apiPrefix)
