FROM node:14.16 as build-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --only=prod
COPY ./public ./public
COPY ./src ./src
RUN npm run build

FROM nginx
COPY --from=build-deps /usr/src/app/build /usr/share/realtimerail.nyc
RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/realtimerail.nyc-nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
