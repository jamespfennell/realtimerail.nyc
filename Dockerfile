FROM node:18.2 as build-deps
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY tsconfig.json .
COPY ./public ./public
COPY ./src ./src
ARG GITHUB_RUN_NUMBER=unset
RUN sed -i -e "s/unset/${GITHUB_RUN_NUMBER}/g" src/build.tsx
RUN cat src/build.tsx
RUN npm run build

RUN CI=true npm test

FROM caddy
COPY --from=build-deps /usr/src/app/build /usr/share/realtimerail.nyc
COPY ./Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
