FROM node:18.16.0 AS build

RUN mkdir /front_video_hosting

WORKDIR /front_video_hosting

COPY package.json ./

COPY . .

RUN npm install

RUN npm install video.js @videojs-player/vue

RUN npm run build

FROM nginx:1.25.1

LABEL org.opencontainers.image.source=https://github.com/echafaud/front_cuteube

COPY nginx-prod.conf /etc/nginx/conf.d/default.conf

COPY --from=build /front_video_hosting/dist /usr/share/nginx/html

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT /entrypoint.sh
