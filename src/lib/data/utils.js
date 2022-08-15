import {
  intervalToDuration,
  isPast,
  differenceInCalendarDays,
  isLeapYear,
} from 'date-fns'
import { browser } from '$app/env'

export function getDateString(date) {
  const dateObject = new Date(date)
  return dateObject.toUTCString()
}

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
  if (birthMonth === now.getMonth() + 1 && birthDate === now.getDate()) return 0
  const isLeapBaby = birthMonth === 2 && birthDate === 29
  let nextBirthDay =
    isLeapBaby && !isLeapYear(now)
      ? new Date(now.getFullYear(), 2, 1)
      : new Date(dateString).setFullYear(now.getFullYear())
  if (isPast(nextBirthDay)) {
    nextBirthDay =
      isLeapBaby && !isLeapYear(new Date(now.getFullYear() + 1))
        ? new Date(now.getFullYear() + 1, 2, 1)
        : new Date(dateString).setFullYear(now.getFullYear() + 1)
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

export function getObjectFromStorage(objectName) {
  if (!browser) return
  const coldObject = browser && localStorage.getItem(objectName)
  return coldObject ? JSON.parse(coldObject) : {}
}
