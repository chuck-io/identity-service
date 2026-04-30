## Hexagonal Architecture (baseline)

- `src/domain`: entities / value objects / domain services (no Nest, no Prisma)
- `src/domain/ports`: interfaces (ports) + DI tokens (no libs)
- `src/application`: use cases + application services + application errors
- `src/entrypoints`: inbound adapters (HTTP controllers, message handlers, etc.)
- `src/infrastructure`: outbound adapters (db, messaging clients, external integrations)

Notes:

- `src/domain/ports/*` are **interfaces (ports)** consumed by use-cases and implemented by outbound adapters. They must not depend on Nest/Prisma/any libs.
- Inbound adapters (controllers) must call `application` only (use-cases), and must not wire dependencies or access infrastructure.
- Outbound adapters (repositories/queries) live in `infrastructure` and implement `domain` ports.

