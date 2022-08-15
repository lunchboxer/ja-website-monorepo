import { scryptSync, randomBytes } from 'node:crypto'
import { GraphQLError } from 'graphql'

function encryptPassword(password, salt) {
  return scryptSync(password, salt, 32).toString('hex')
}
function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  return encryptPassword(password, salt) + salt
}

function passwordMatches(password, hash) {
  const salt = hash.slice(64)
  const originalPassHash = hash.slice(0, 64)
  const currentPassHash = encryptPassword(password, salt)
  return originalPassHash === currentPassHash
}

export const user = {
  createUser: async (_, { input }, context) => {
    const { role, password, ...parameters } = input
    const hashedPassword = hashPassword(password)
    const usernameTaken = await context.prisma.user.findFirst({
      where: { username: parameters.username },
    })
    if (usernameTaken) throw new GraphQLError('Username already exists')

    return context.prisma.user.create({
      data: {
        ...parameters,
        password: hashedPassword,
        roles: {
          connectOrCreate: {
            where: {
              name: role,
            },
            create: {
              name: role,
            },
          },
        },
      },
    })
  },

  updateUser: async (_, { input }, { prisma }) => {
    const { id, ...data } = input
    return prisma.user.update({
      where: { id },
      data,
    })
  },

  changePassword: async (_, { id, newPassword, oldPassword }, context) => {
    const user = await context.prisma.user.findUnique({ where: { id } })
    if (!passwordMatches(oldPassword, user.password)) {
      throw new GraphQLError('Invalid password')
    }
    const hashedPassword = hashPassword(newPassword)
    return context.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    })
  },

  deleteUser: (_, { id }, { prisma }) => prisma.user.delete({ where: { id } }),

  assignRole: (_, { userId, role }, { prisma }) =>
    prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          connectOrCreate: {
            create: { name: role },
            where: { name: role },
          },
        },
      },
    }),

  unassignRole: (_, { userId, role }, { prisma }) =>
    prisma.user.update({
      where: { id: userId },
      data: {
        roles: { disconnect: { name: role } },
      },
    }),
}
