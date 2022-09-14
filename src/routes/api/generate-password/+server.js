import crypto from 'node:crypto'
import { adjectives } from './adjectives.js'
import { nouns } from './nouns.js'
import { json } from '@sveltejs/kit'

export function generatePassword() {
  const randomAdjectiveIndex = crypto.randomInt(0, adjectives.length)
  const randomNounIndex = crypto.randomInt(0, nouns.length)
  const adjective = adjectives[randomAdjectiveIndex]
  const noun = nouns[randomNounIndex]
  return `${adjective} ${noun}`
}

export async function GET() {
  return json({ password: generatePassword() })
}
