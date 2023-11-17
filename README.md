# Full stack coding exercise

## What's inside

### Server

- Server built in TypeScript using Express
- Located in `/server` with all TS source files found in `/server/src` with build output to `/server/build`
- Main express app can be found in `/server/src/index.ts` with all routes found in `/server/src/routes/index.ts`

### React client

- React app built off of Create React App's TypeScript template
- CRA app can be found in `/client` directory with all TS source files found in the `/client/src` directory

## Setting up

1. Download repository and run `npm install` in the root directory. Post-install script should run automatically to trigger an `npm install` within the client directory. automatically so all dependencies _should_ be installed.
2. First Run `npm run server:dev` script to start express development server.
3. Then Run `npm run client:dev` script to start react development server.
