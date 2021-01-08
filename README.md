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

Try with `storm` (aka development) first.

```
amplify env list
amplify env checkout storm
amplify push
amplify env checkout staging
```

If developed is ready, move to staging:

```
amplify env checkout staging
amplify push
```

## License

GNU General Public License v3.0

Crafted with loove by @danigb and @mi-mina
