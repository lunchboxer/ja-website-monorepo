export const User = {
  groups: (root, _, { prisma }) =>
    prisma.user
      .findUnique({
        where: { id: root.id },
      })
      .groups(),
  roles: async (root, _, { prisma }) => {
    const wholeRoles = await prisma.user
      .findUnique({
        where: { id: root.id },
      })
      .roles()
    return wholeRoles?.map((role) => role.name)
  },
  studentId: async (root, _, { prisma }) => {
    const student = await prisma.user
      .findUnique({
        where: { id: root.id },
      })
      .student()
    return student?.id
  },
}
