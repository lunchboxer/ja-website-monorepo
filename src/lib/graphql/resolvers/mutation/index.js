import { user } from './user.js'
import { school } from './school.js'
import { schoolYear } from './school-year.js'
import { student } from './student.js'
import { role } from './role.js'
import { guardian } from './guardian.js'
import { group } from './group.js'

export const Mutation = {
  ...user,
  ...school,
  ...schoolYear,
  ...student,
  ...role,
  ...guardian,
  ...group,
}
