FROM node:alpine
# FROM oven/bun as base
COPY . /app
WORKDIR /app

# RUN ["npm", "install"]
# RUN npm install
# RUN ["npm", "run", "build"]
# RUN bun build --entrypoints ./src/index --outdir ./build --target browser

EXPOSE 3000
CMD [ "npx", "serve", "-s", "build" ]
# CMD npm run start
# CMD [ "bunx", "serve", "-s", "build"]