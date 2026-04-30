## Operations

### Local development

Requirements:

- Node.js LTS
- Yarn
- Docker (optional, for PostgreSQL)

Setup:

```bash
yarn
copy .env.example .env
docker compose up -d
yarn prisma:generate
yarn seed
```

Run:

```bash
yarn start:dev
```

### Environment variables

See `.env.example` for the full list. Key variables:

- `PORT`: HTTP port (default 3000)
- `SWAGGER_ENABLED`: enables `/docs`
- `DATABASE_URL`: Postgres connection string
- `JWT_SECRET`: JWT signing secret
- `JWT_EXPIRES_IN`: token expiration (e.g. `15m`)
- `DATA_ENCRYPTION_KEY`: key for encrypting sensitive fields
- `DATA_ENCRYPTION_HMAC_KEY`: key for deterministic HMAC hashing

### Database workflows

- Generate client: `yarn prisma:generate`
- Migrations (dev): `yarn prisma:migrate:dev`
- Migrations (deploy): `yarn prisma:migrate:deploy`
- Seed: `yarn seed`

### Troubleshooting

#### Port already in use

If you see `EADDRINUSE :::3000`, another process is using the configured port.

- stop the running dev server
- or set `PORT` to another value

#### Swagger not available

- ensure `SWAGGER_ENABLED=true`
- confirm the service is running and listening on the expected port

#### JWT DI error (`JwtService` not resolved)

This happens if `JwtModule` is not available where `JwtTokenSignerService` is provided.
Current architecture wires JWT signing in `InfrastructureModule`.

