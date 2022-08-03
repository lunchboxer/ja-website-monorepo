export async function checkOrder(startDate, endDate, id, database) {
  if (!startDate && !endDate) return false
  // if both dates aren't given, then get the missing date to compare
  if (id && (!startDate || !endDate)) {
    const thisSchoolYear = await database.schoolYear.findUnique({ where: id })
    startDate = startDate || thisSchoolYear.startDate
    endDate = endDate || thisSchoolYear.endDate
  }
  if (startDate >= endDate) {
    throw new Error(`Start date (${startDate}) is after end date (${endDate})`)
  }
}

export async function commonNameUniqueInGroup(commonName, groupId, database) {
  const found = await database.student.findFirst({
    where: {
      commonName,
      groups: {
        some: {
          id: groupId,
        },
      },
    },
  })
  if (found) {
    throw new Error(`Common name '${commonName}' already used in group`)
  }
  return true
}
export async function checkConflicts(startDate, endDate, id, database) {
  if (!startDate && !endDate) return false
  if (startDate) {
    const startConflict = await database.schoolYear.findFirst({
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
      throw new Error(
        `Start date overlaps with school year '${startConflict.name}'`,
      )
    }
  }
  if (endDate) {
    const endConflict = await database.schoolYear.findFirst({
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
      throw new Error(
        `End date overlaps with school year '${endConflict.name}'`,
      )
    }
  }

  // updating only one date
  // need to get both to check if surrounds another semester
  if (id && (!startDate || !endDate)) {
    const thisSchoolYear = await database.schoolYear.findUnique({ where: id })
    startDate = startDate || thisSchoolYear.startDate
    endDate = endDate || thisSchoolYear.endDate
  }
  if (endDate && startDate) {
    const insideConflict = await database.schoolYear.findFirst({
      where: {
        startDate: { gte: startDate },
        endDate: { lte: endDate },
        id: { not: id },
      },
    })
    if (insideConflict) {
      throw new Error(`Dates include semester '${insideConflict.name}'`)
    }
  }
}
