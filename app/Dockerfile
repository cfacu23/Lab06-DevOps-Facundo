FROM node:20-alpine

WORKDIR /usr/src/lab06

ENV NODE_ENV=production

COPY app/package*.json ./app/

RUN cd app && npm ci --omit=dev

COPY app ./app
COPY web ./web

WORKDIR /usr/src/lab06/app

EXPOSE 3000

CMD ["npm", "start"]