## Architecture (Hexagonal)

### Layers

- **domain** (`src/domain`)
  - Pure business concepts: entities/value objects/domain services
  - No NestJS, no Prisma, no HTTP

- **application** (`src/application`)
  - Use-cases + orchestration
  - Defines **ports** (interfaces) required to execute use-cases, e.g. repositories
  - Application-level errors (mapped to HTTP by entrypoints)

- **entrypoints** (`src/entrypoints`)
  - Inbound adapters (HTTP controllers, message handlers)
  - Translates external input (HTTP DTOs) -> calls `application`
  - Translates application errors -> HTTP responses

- **infrastructure** (`src/infrastructure`)
  - Outbound adapters (Prisma repositories, messaging clients, external SDKs)
  - Implements `application` ports

### Why repository ports live in `application` (not `domain`)

Repository interfaces represent **what the application needs** to execute a use-case (persistence is a technical concern). Keeping them in `application`:

- keeps `domain` independent from storage concerns
- prevents accidental coupling to Prisma/DB shapes
- allows multiple adapters (Prisma, REST, mocks) without changing `domain`

