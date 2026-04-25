## Hexagonal Architecture (baseline)

- `src/domain`: entities / value objects / domain services (no Nest, no Prisma)
- `src/application`: use cases / ports (interfaces) / DTOs for use cases
- `src/interfaces`: controllers / message handlers (Nest transport layer)
- `src/infrastructure`: adapters (db, messaging clients, external integrations)

We will add ports and adapters as we implement features.

