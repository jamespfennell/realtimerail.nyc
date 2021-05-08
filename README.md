
# realtimerail.nyc web app

This repository hosts the UI code for the
[realtimerail.nyc web app](https://www.realtimerail.nyc). 
The UI is written using React.
It accesses NYC subway data using
[Transiter](https://www.github.com/jamespfennell/transiter).

The codebase was started using `create-react-app`.
Assuming that you have `node` installed,
the development server can be launched using:
```
npm start
```
An optimized production build can be created using:
```
npm run build
```

In production the app is run using Docker.
The project's Docker image is an Nginx image containing the compiled files and some basic caching configuration.
