export const Student = {
  groups({ id }, _, context) {
    return context.prisma.student.findUnique({ where: { id } }).groups()
  },

  guardians({ id }, _, context) {
    return context.prisma.student.findUnique({ where: { id } }).guardians()
  },

  user({ id }, _, { prisma }) {
    return prisma.student.findUnique({ where: { id } }).user()
  },
}
