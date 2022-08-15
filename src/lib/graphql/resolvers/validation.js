import { GraphQLError } from 'graphql'

export async function checkOrder(startDate, endDate, id, prisma) {
  if (!startDate && !endDate) return false
  // if both dates aren't given, then get the missing date to compare
  if (id && (!startDate || !endDate)) {
    const thisSchoolYear = await prisma.schoolYear.findUnique({ where: { id } })
    startDate = startDate || thisSchoolYear.startDate
    endDate = endDate || thisSchoolYear.endDate
  }
  if (startDate >= endDate) {
    throw new GraphQLError(
      `Start date (${startDate}) is after end date (${endDate})`,
    )
  }
}
export async function checkConflicts(startDate, endDate, id, prisma) {
  if (!startDate && !endDate) return false
  if (startDate) {
    const startConflict = await prisma.schoolYear.findFirst({
      where: {
        startDate: {
          lte: startDate,
        },
        endDate: {
          gte: startDate,
        },
        id: {
          not: id,
        },
      },
    })
    if (startConflict) {
      throw new GraphQLError(
        `Start date overlaps with school year '${startConflict.name}'`,
      )
    }
  }
  if (endDate) {
    const endConflict = await prisma.schoolYear.findFirst({
      where: {
        // new endDate is during existing school year
        startDate: {
          lte: endDate,
        },
        endDate: {
          gte: endDate,
        },
        id: {
          not: id,
        },
      },
    })
    if (endConflict) {
      throw new GraphQLError(
        `End date overlaps with school year '${endConflict.name}'`,
      )
    }
  }

  // updating only one date
  // need to get both to check if surrounds another semester
  if (id && (!startDate || !endDate)) {
    const thisSchoolYear = await prisma.schoolYear.findUnique({ where: { id } })
    startDate = startDate || thisSchoolYear.startDate
    endDate = endDate || thisSchoolYear.endDate
  }
  if (endDate && startDate) {
    const insideConflict = await prisma.schoolYear.findFirst({
      where: {
        startDate: { gte: startDate },
        endDate: { lte: endDate },
        id: { not: id },
      },
    })
    if (insideConflict) {
      throw new GraphQLError(`Dates include semester '${insideConflict.name}'`)
    }
  }
}
