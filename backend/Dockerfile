from oven/bun:1 as base

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3001

CMD ["bun", "start"]

