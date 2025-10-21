# Base stage with Bun
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# API stage
FROM base AS api
EXPOSE 3000
CMD ["bun", "run", "--watch", "api/src/index.ts"]

# Bot stage
FROM base AS bot
CMD ["bun", "run", "--watch", "bot/index.ts"]