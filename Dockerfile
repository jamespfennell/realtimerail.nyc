FROM node:18.2 as build-deps
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY tsconfig.json .
COPY ./public ./public
COPY ./src ./src
RUN npm run build

FROM nginx
COPY --from=build-deps /usr/src/app/build /usr/share/realtimerail.nyc
RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/realtimerail.nyc-nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
