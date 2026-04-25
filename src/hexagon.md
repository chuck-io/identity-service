## Hexagonal Architecture (baseline)

- `src/domain`: entities / value objects / domain services (no Nest, no Prisma)
- `src/application`: use cases + ports (interfaces) + application errors
- `src/entrypoints`: inbound adapters (HTTP controllers, message handlers, etc.)
- `src/infrastructure`: outbound adapters (db, messaging clients, external integrations)

Notes:

- `src/application/ports/*` are **interfaces (ports)** consumed by use-cases. They belong to `application` because they are driven by application needs and keep `domain` free from infrastructure concerns.
- Inbound adapters (controllers) must call `application` only (use-cases/ports), never Prisma directly.
- Outbound adapters (repositories) implement `application` ports and can use Prisma/SDKs.

