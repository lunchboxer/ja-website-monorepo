import { GraphQLError } from 'graphql'

export const Query = {
  me: async (_, parameters, context) => {
    const { user } = context
    if (!user) {
      throw new GraphQLError("Requested authenticated user doesn't exists.")
    }
    return user
  },

  user: async (_, { id }, context) => {
    return context.prisma.user.findUnique({
      where: {
        id,
      },
    })
  },

  users: (_, parameters, context) => {
    return context.prisma.user.findMany()
  },

  userCount: async (_, parameters, { prisma }) => {
    const count = await prisma.user.aggregate({ _count: { id: true } })
    return count._count.id
  },

  role: (_, { id, name }, context) => {
    return context.prisma.role.findFirst({
      where: {
        OR: [{ name }, { id }],
      },
    })
  },

  roles: (root, parameters, context) => {
    return context.prisma.role.findMany()
  },

  roleCount: async (_, parameters, { prisma }) => {
    const count = await prisma.role.aggregate({ _count: { id: true } })
    return count._count.id
  },

  school: (_, parameters, context) => {
    // Only one record is supported
    return context.prisma.school.findUnique({ where: { id: 1 } })
  },

  schoolYear: async (_, { id }, context) => {
    return context.prisma.schoolYear.findUnique({ where: { id } })
  },

  schoolYears: async (_, parameters, context) => {
    return context.prisma.schoolYear.findMany({
      // we're most likely to be using the latest one most
      orderBy: { startDate: 'desc' },
    })
  },

  group: async (_, { id }, context) => {
    return context.prisma.group.findUnique({ where: { id } })
  },

  groups: async (_, parameters, context) => {
    return context.prisma.group.findMany({
      orderBy: { updatedAt: 'desc' },
    })
  },

  student: async (_, { id }, context) => {
    return context.prisma.student.findUnique({ where: { id } })
  },

  students: async (_, parameters, context) => {
    return context.prisma.student.findMany({
      orderBy: { commonName: 'asc' },
    })
  },

  guardian: async (_, { id }, context) => {
    return context.prisma.guardian.findUnique({ where: { id } })
  },

  guardians: async (_, parameters, context) => {
    return context.prisma.guardian.findMany({
      orderBy: { name: 'asc' },
    })
  },
}
