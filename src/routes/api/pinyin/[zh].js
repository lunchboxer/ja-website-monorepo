// send me some chinese I'll send you some pinyin
// doing this on the client is easy, but the bundle is like 2.2mb
import { pinyin } from 'pinyin-pro'

export const GET = async ({ params }) => {
  const { zh } = params
  let pinyinString = pinyin(zh, { mode: 'surname' })
  pinyinString = pinyinString.charAt(0).toUpperCase() + pinyinString.slice(1)
  return {
    body: { pinyin: pinyinString },
  }
}
