import { checkOrder, checkConflicts } from '../validation.js'

export const schoolYear = {
  createSchoolYear: async (_, { input }, { prisma }) => {
    const { name, startDate, endDate } = input
    await checkOrder(startDate, endDate, _, prisma)
    await checkConflicts(startDate, endDate, _, prisma)
    return prisma.schoolYear.create({
      data: { name, startDate, endDate },
    })
  },
  updateSchoolYear: async (_, { input }, { prisma }) => {
    const { id, startDate, endDate, name } = input
    await checkOrder(startDate, endDate, id, prisma)
    await checkConflicts(startDate, endDate, id, prisma)
    return prisma.schoolYear.update({
      where: {
        id,
      },
      data: { startDate, endDate, name },
    })
  },
  deleteSchoolYear: async (_, { id }, context) => {
    return await context.prisma.schoolYear.delete({ where: { id } })
  },
}
