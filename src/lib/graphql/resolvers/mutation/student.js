import { pinyin } from 'pinyin-pro'
import { scryptSync, randomBytes } from 'node:crypto'
import { GraphQLError } from 'graphql'

function encryptPassword(password, salt) {
  return scryptSync(password, salt, 32).toString('hex')
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  return encryptPassword(password, salt) + salt
}

export async function disconnectOtherGroupsThisSchoolYear(
  studentId,
  newGroupId,
  database,
) {
  // check which groups student is already in, ignoring the new one if already in
  const existingGroups = await database.student.findUnique({
    where: { id: studentId },
    select: {
      groups: {
        where: {
          id: {
            not: newGroupId,
          },
        },
        select: {
          name: true,
          id: true,
          schoolYearId: true,
        },
      },
    },
  })
  if (existingGroups.groups.length === 0) return
  // put the results in a form that can be used to disconnec from old groups
  const idObjectsArray = existingGroups.groups.map((g) => ({ id: g.id }))
  await database.student.update({
    where: { id: studentId },
    data: {
      groups: {
        disconnect: idObjectsArray,
      },
    },
  })
}

export const student = {
  createStudent: async (_, { input }, { prisma }) => {
    const { groupId, password, username, ...parameters } = input
    const hashedPassword = hashPassword(password)
    const usernameTaken = await prisma.user.findFirst({
      where: { username },
    })
    if (usernameTaken) throw new GraphQLError('Username already exists')
    const student = await prisma.student.create({
      data: {
        ...parameters,
        groups: {
          connect: { id: groupId },
        },
        user: {
          create: {
            username,
            password: hashedPassword,
            roles: {
              connectOrCreate: {
                create: { name: 'student' },
                where: { name: 'student' },
              },
            },
          },
        },
      },
    })
    return student
  },

  updateStudent: async (_, { input }, { prisma }) => {
    const { groupId, id, ...parameters } = input
    if (parameters.chineseName && !parameters.pinyinName) {
      const pinyinString = pinyin(parameters.chineseName, { mode: 'surname' })
      parameters.pinyinName =
        pinyinString.charAt(0).toUpperCase() + pinyinString.slice(1)
    }
    await disconnectOtherGroupsThisSchoolYear(id, groupId, prisma)
    return prisma.student.update({
      where: { id },
      data: {
        ...parameters,
        groups: {
          connect: { id: groupId },
        },
      },
    })
  },

  deleteStudent: async (_, { id }, { prisma }) =>
    prisma.student.delete({ where: { id } }),
}
