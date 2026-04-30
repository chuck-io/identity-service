# identity-service

NestJS microservice boilerplate using **Hexagonal Architecture** + **Prisma (PostgreSQL)**.

## Documentation

Repository documentation lives in `docs/` (ready to migrate to Notion/Confluence):

- `docs/README.md` (documentation hub)
- `docs/overview.md` (service overview)
- `docs/ARCHITECTURE.md` + `docs/diagrams.md` (architecture + Mermaid diagrams)
- `docs/api.md` (Swagger/auth/errors/pagination)
- `docs/data-dictionary.md` (database dictionary)
- `docs/SECURITY.md` (sensitive-data handling / encryption)
- `docs/operations.md` (env vars, runbooks, troubleshooting)

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
yarn seed
```

## Run

```bash
yarn start:dev
```

## Swagger

- **Docs UI**: `http://localhost:3000/docs`
- Toggle via `.env`: `SWAGGER_ENABLED=true|false`

## Security / API design

- This API **never exposes database numeric IDs**.
- All routes use **UUIDs** as identifiers (`:uuid`) and responses return `uuid` only.
- `User.password` is never returned by the API.

## Endpoints (CRUD, UUID-based)

After starting the app, CRUD endpoints will be available under:

- `GET/POST /roles`, `GET/PATCH/DELETE /roles/:uuid`
- `GET/POST /companies`, `GET/PATCH/DELETE /companies/:uuid`
- `GET/POST /users`, `GET/PATCH/DELETE /users/:uuid`
- `GET/POST /teachers`, `GET/PATCH/DELETE /teachers/:uuid`

