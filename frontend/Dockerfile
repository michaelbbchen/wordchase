# FROM node:alpine
FROM oven/bun as base
COPY . /app
WORKDIR /app

RUN bun install

EXPOSE 3000
# CMD npm run start
CMD bun start