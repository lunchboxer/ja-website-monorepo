import { sveltekit } from '@sveltejs/kit/vite'
import graphqlPluginStrings from 'vite-plugin-graphql-strings'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [graphqlPluginStrings(), sveltekit()],
}
export default config
