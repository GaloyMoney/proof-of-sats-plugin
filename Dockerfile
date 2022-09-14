FROM node:16-alpine AS BUILD_IMAGE

WORKDIR /app

RUN apk update 

COPY ./*.json ./yarn.lock ./

RUN  yarn install --frozen-lockfile 

COPY ./src ./src 

RUN yarn build

RUN yarn install --frozen-lockfile --production

FROM gcr.io/distroless/nodejs:16
COPY --from=BUILD_IMAGE /app/dist /app/dist
COPY --from=BUILD_IMAGE /app/node_modules /app/node_modules

WORKDIR /app

COPY ./*js ./package.json ./yarn.lock ./

USER 1000

CMD ["dist/servers/apollo-server.js"]
