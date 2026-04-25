# identity-service

NestJS microservice boilerplate using **Hexagonal Architecture** + **Prisma (PostgreSQL)**.

## Requirements

- Node.js LTS
- Yarn
- Docker (optional, for PostgreSQL)

## Setup

```bash
yarn
copy .env.example .env
docker compose up -d
yarn prisma:generate
```

## Run

```bash
yarn start:dev
```

