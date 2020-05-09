# Antropoloops player

See it here: https://play.antropoloops.com/

Beta: https://play-beta.antropoloops.com/

## Setup

You need node and yarn installed:

⚠️ yarn is required. npm doesn't work because it's a [yarn workspaces monorepo](https://classic.yarnpkg.com/en/docs/workspaces/).

```bash
git clone git@github.com:antropoloops/player.git
yarn install
yarn setup
```

## Development

VSCode recommended.

To start the application in development mode:

```
yarn start
```

## Deploy

#### Staging (beta)

[![Netlify Status](https://api.netlify.com/api/v1/badges/284452e7-f4ca-42a7-bd30-52e5a5fe66d2/deploy-status)](https://app.netlify.com/sites/agitated-wright-68b7c5/deploys)

Create a PR and merge into master

#### Production

[![Netlify Status](https://api.netlify.com/api/v1/badges/de935516-fe15-4ba1-b043-c0fd022552c6/deploy-status)](https://app.netlify.com/sites/mystifying-franklin-00dbbc/deploys)

Push master into production:

```bash
git push origin master:production
```

## License

GNU General Public License v3.0

Crafted with loove by @danigb and @mi-mina
