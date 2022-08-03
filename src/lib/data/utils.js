import {
  intervalToDuration,
  isPast,
  differenceInCalendarDays,
  isLeapYear,
} from 'date-fns'

export function getFullAge(dateString) {
  if (!dateString) return
  const today = new Date()
  const birthDate = new Date(dateString)
  const { years, months, days } = intervalToDuration({
    start: birthDate,
    end: today,
  })
  return { years, months, days }
}

export function getAge(dateString) {
  if (dateString === 'none') return
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export function daysToBirthday(dateString) {
  if (!dateString) return
  const now = new Date()
  const birthdate = new Date(dateString)
  const birthMonth = birthdate.getMonth() + 1
  const birthDate = birthdate.getDate()
  let nextBirthDay
  let isLeapBaby = false
  if (birthMonth === now.getMonth() + 1 && birthDate === now.getDate()) return 0
  if (birthMonth === 2 && birthDate === 29) isLeapBaby = true
  if (isLeapBaby && !isLeapYear(now)) {
    nextBirthDay = new Date(now.getFullYear(), 2, 1)
  } else {
    nextBirthDay = new Date(dateString).setFullYear(now.getFullYear())
  }
  if (isPast(nextBirthDay)) {
    if (isLeapBaby && !isLeapYear(new Date(now.getFullYear() + 1))) {
      nextBirthDay = new Date(now.getFullYear() + 1, 2, 1)
    } else {
      nextBirthDay = new Date(dateString).setFullYear(now.getFullYear() + 1)
    }
  }
  return differenceInCalendarDays(nextBirthDay, now)
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
  const idObjectsArray = existingGroups.groups.map(g => ({ id: g.id }))
  await database.student.update({
    where: { id: studentId },
    data: {
      groups: {
        disconnect: idObjectsArray,
      },
    },
  })
}
