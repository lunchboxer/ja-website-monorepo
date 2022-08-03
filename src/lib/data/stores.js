import { writable, derived } from 'svelte/store'
import { browser } from '$app/env'
import { daysToBirthday, getAge } from '$lib/data/utils.js'

function getObjectFromStorage(object) {
  if (!browser) return
  const coldObject = browser && localStorage.getItem(object)
  return coldObject ? JSON.parse(coldObject) : {}
}

export const me = writable(getObjectFromStorage('me'))
browser &&
  me.subscribe(value => {
    if (!value) return
    localStorage.me = JSON.stringify(value)
  })

export const school = writable(getObjectFromStorage('school'))
browser &&
  school.subscribe(value => {
    if (!value) return
    localStorage.school = JSON.stringify(value)
  })

export const schoolYears = writable(getObjectFromStorage('schoolYears'))
browser &&
  schoolYears.subscribe(value => {
    if (!value) return
    localStorage.schoolYears = JSON.stringify(value)
  })

export const groups = writable([])
export const students = writable([])
export const upcomingBirthdays = derived(students, $students => {
  const upcoming = []
  for (const student of $students) {
    const days = daysToBirthday(student.birthdate)
    if (days < 21) {
      upcoming.push({
        id: student.id,
        name: student.commonName,
        age: getAge(student.birthdate),
        days,
      })
    }
  }
  return upcoming
})
