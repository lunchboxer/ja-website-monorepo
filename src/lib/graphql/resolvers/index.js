import {
  DateResolver,
  DateTimeResolver,
  EmailAddressResolver,
} from 'graphql-scalars'
import { Mutation } from './mutation/index.js'
import { Query } from './query.js'
import { User } from './user.js'
import { SchoolYear } from './school-year.js'
import { Group } from './group.js'
import { Student } from './student.js'
import { Guardian } from './guardian.js'
import { Role } from './role.js'

export const resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Query,
  Mutation,
  User,
  SchoolYear,
  Student,
  Group,
  Guardian,
  Role,
}
