import { it, expect } from 'vitest'
import {
  getDateString,
  getFullAge,
  daysToBirthday,
} from '../src/lib/data/utils.js'

// getDateString
it('returns years, months, and days as number', () => {
  const dateString = '2011-04-20'
  const result = getFullAge(dateString)
  expect(result).toBeTypeOf('object')
  expect(result.years).toBeTypeOf('number')
  expect(result.months).toBeTypeOf('number')
  expect(result.days).toBeTypeOf('number')
})

// getFullAge
it('returns a string', () => {
  const dateString = '2011-04-20'
  const result = getDateString(dateString)
  expect(result).toBe('Wed, 20 Apr 2011 00:00:00 GMT')
})

// daysToBirthday
it('returns an integer', () => {
  const dateString = '2011-04-20'
  const result = daysToBirthday(dateString)
  expect(result).toBeTypeOf('number')
})

it('returns a number of days less than 366', () => {
  const dateString = '2011-04-20'
  const result = daysToBirthday(dateString)
  expect(result).toBeLessThan(366)
})
