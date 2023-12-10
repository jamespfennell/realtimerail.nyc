# realtimerail.nyc

[realtimerail.nyc](https://realtimerail.nyc)
is an open-source web app for the NYC subway.
It displays train times based on realtime data from the MTA.
The app's philosophy is to be very simple and 100% user-centric.
No cookes, no tracking, no ads, etc.

This repository hosts the UI code.
The app uses [Transiter](https://www.github.com/jamespfennell/transiter) on the backend.

Contributions are very welcome!

## Development guide

Assuming that you have `node` installed,
the development build listing on port 3000 is launched using:

```
npm start
```

By default, all backend requests are proxied to `staging.realtimerail.nyc`
so you don't need to run the backend yourself.

An optimized production build can be created using:

```
npm run build
```

However in production the app is deployed as a Docker image:

```
docker build .
```

The project's Docker image is an Nginx image containing the compiled files
and some basic caching configuration.

### Code layout

Each page in the app is a separate Typescript file in `src/pages`.
Common UI elements are extracted and shared via in `src/elements`
React hooks (for HTTP requests, loading favorites, GPS location) are in `src/hooks`.
Non-React Javascript helper files are in `src/lib`.

Other files in the `src` directory are largely self-explanatory and generally don't need to be touched.

### Formatting/linting/testing

Formatter: `npx prettier . --write`

Linter: `npx eslint src`

Tests: unfortunately almost non-existent.
The few tests that exist can be run with `npm test`.

### Backend

As mentioned above, all backend requests are proxied to `staging.realtimerail.nyc`.
In general the app expects Transiter to be available at `$DOMAIN/transiter/v0.6`
and expects the NYC subway system to be installed in the Transiter instance with ID `us-ny-subway`.
The `transiter/v0.6` and `us-ny-subway` constants live in `src/api/api.ts` in case you want to change them.

## License

MIT.

The icons used in the header are from [Iconoir](https://iconoir.com/) and are also MIT licensed.

The subway symbols are copyrighted by the MTA. The app has a license from the MTA to use them.
