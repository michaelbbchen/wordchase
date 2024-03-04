FROM oven/bun as base
COPY . /app
WORKDIR /app

RUN bun install

EXPOSE 3001
# CMD node --loader ts-node/esm app.ts
CMD bun run app.ts
