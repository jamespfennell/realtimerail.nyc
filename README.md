
# realtimerail.nyc web app

This repository contains the UI code for the
realtimerail.nyc web app. 
The UI is written using React.
It accesses NYC subway data using
[Transiter](https://www.github.com/jamespfennell/transiter).

The codebase was started using `create-react-app`,
so the basic layout of the project will be familiar
to many developers.
Assuming that you have `node` installed,
the development server can be launched using:
```
npm start
```
An optimized production build can be created using:
```
npm run build
```

## Docker build

The `docker` subdirectory contains files that are used
to produce a Docker container for the app.
The container is basically an Nginx container.
Nginx listens on port 80 *within the container*.
It serves the web app's production build static files at the root,
and proxies requests to `/transiter/` to a Transiter web server
which is assumed to be listening on port 8000 (the Gunicorn default).

As part of the continuous integration pipeline for this
repository, Docker images are automatically built on
[Travis CI](https://travis-ci.org/jamespfennell/realtimerail.nyc-react)
and the resulting images uploaded to a 
[Docker Hub repository](https://cloud.docker.com/repository/docker/jamespfennell/realtimerail.nyc/general).
The tag name for an image is the name of the branch it was build off;
 the master image
 thus contains the most recent work.






