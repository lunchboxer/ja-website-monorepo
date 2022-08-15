export const group = {
  createGroup: (_, { name, grade, schoolYearId }, { prisma }) =>
    prisma.group.create({
      data: {
        name,
        grade,
        schoolYear: {
          connect: { id: schoolYearId },
        },
      },
    }),

  updateGroup: async (_, { input }, { prisma }) => {
    const { id, ...data } = input
    const result = await prisma.group.update({ where: { id }, data })
    return result
  },

  deleteGroup: (_, { id }, { prisma }) =>
    prisma.group.delete({ where: { id } }),
}
