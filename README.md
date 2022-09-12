# Junior Adventurers

This is a sveltekit app with a grpahql API at /api/graphql. a graphiql interface is included for convenience at /graphiql.html

## Set up

Make sure you have a .env file like:

```bash
JWT_SECRET=consecrate-define-blockquote-smith
DATABASE_URL="file:./dev.db"
```

if you are using a sqlite database, as in this example, the file path is relative to the `schema.prisma` file located by default in `prisma/`

You may need to run `npx prisma db push` to ensure the database is properly set up once you have your `.env` file set up.

Finally, you need to generate the prisma client with `npm run generate`.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
