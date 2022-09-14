import { writable, derived } from 'svelte/store'
import { request } from '$graphql/client.js'
import { daysToBirthday, getAge } from '$lib/data/utils.js'
import {
  STUDENTS,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from '$graphql/students.gql'

function createStudentsStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // Get //
    get: async () => {
      const response = await request(STUDENTS)
      response && set(response.students)
    },
    // Create //
    create: async (student) => {
      const response = await request(CREATE_STUDENT, { input: { ...student } })
      update((existing) => [...existing, response.createStudent])
    },
    // Patch //
    patch: async (student) => {
      const { groups, guardians, createdAt, updatedAt, ...cleanStudent } =
        student
      const response = await request(UPDATE_STUDENT, {
        input: { ...cleanStudent },
      })
      update((existing) =>
        existing.map((s) => {
          if (s.id === student.id) return response.updateStudent
          return s
        }),
      )
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_STUDENT, { id })
      update((existing) => existing.filter((s) => s.id !== id))
    },
    generatePassword: async () => {
      const response = await fetch('/api/generate-password')
      const data = await response.json()
      return data.password
    },
  }
}

export const students = createStudentsStore()

export const upcomingBirthdays = derived(students, ($students) => {
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
