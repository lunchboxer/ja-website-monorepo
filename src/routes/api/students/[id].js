import { database } from '$lib/data/database.js'
import { dev } from '$app/env'
import { pinyin } from 'pinyin-pro'
import { disconnectOtherGroupsThisSchoolYear } from '$lib/data/utils.js'
import { deleteById } from '../_utils.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
  const { id } = params
  try {
    const student = await database.student.findUnique({
      where: { id },
      include: {
        groups: true,
      },
    })
    return {
      body: { student },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export const PATCH = async ({ request, params }) => {
  const id = params.id
  try {
    const { groupId, ...parameters } = await request.json()
    if (!id) {
      throw new Error('Missing required input')
    }
    if (parameters.chineseName && !parameters.pinyinName) {
      const pinyinString = pinyin(parameters.chineseName, { mode: 'surname' })
      parameters.pinyinName =
        pinyinString.charAt(0).toUpperCase() + pinyinString.slice(1)
    }
    await disconnectOtherGroupsThisSchoolYear(id, groupId, database)
    const student = await database.student.update({
      where: { id },
      data: {
        ...parameters,
        groups: {
          connect: { id: groupId },
        },
      },
      include: { groups: true },
    })

    return {
      body: { student },
    }
  } catch (error) {
    if (dev) console.error(error)
    return {
      status: 400,
      body: { errors: error.message },
    }
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export const DELETE = event => deleteById(event, 'student')
