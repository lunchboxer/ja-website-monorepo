import { sveltekit } from '@sveltejs/kit/vite'
import graphqlPluginStrings from 'vite-plugin-graphql-strings'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [graphqlPluginStrings(), sveltekit({ hot: !process.env.VITEST })],
  test: {
    deps: {
      inline: ['date-fns'],
    },
    globals: true,
    environment: 'jsdom',
  },
})
