# Antropoloops player

#### https://play.antropoloops.com/

[staging] https://play-beta.antropoloops.com/

## Setup

- Clone repository
- `yarn install`
- `yarn start`

## Development

Mock API:

```
amplify mock api
```

Generate TS models:

```
amplify codegen models
```

Generate GraphlQL code:

```
amplify codegen
```

## Deploy

Ensure both codegen and codegen models are up to date.

```
amplify env list
amplify env checkout storm
amplify push
amplify env checkout staging
```

## License

GNU General Public License v3.0

Crafted with loove by @danigb and @mi-mina
