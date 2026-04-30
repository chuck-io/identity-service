## Architecture (Hexagonal)

### Layers

- **domain** (`src/domain`)
  - Pure business concepts: entities/value objects/domain services
  - No NestJS, no Prisma, no HTTP

- **domain ports** (`src/domain/ports`)
  - Interfaces (ports) and DI tokens used by `application` and implemented by `infrastructure`
  - Must not depend on NestJS/Prisma/HTTP/any libs

- **application** (`src/application`)
  - Use-cases + orchestration
  - Application-level errors (mapped to HTTP by entrypoints)

- **entrypoints** (`src/entrypoints`)
  - Inbound adapters (HTTP controllers, message handlers)
  - Translates external input (HTTP DTOs) -> calls `application`
  - Does not wire dependencies (dependency injection happens in `application`)
  - Translates application errors -> HTTP responses (via filters)

- **infrastructure** (`src/infrastructure`)
  - Outbound adapters (Prisma repositories, messaging clients, external SDKs)
  - Implements `domain` ports
  - No access to `application` or `entrypoints`

### Why ports live in `domain/ports`

Ports represent the project’s stable “connectors” between layers. Keeping them in `domain/ports`:

- keeps `domain` independent from infrastructure frameworks (Nest/Prisma/HTTP)
- allows `application` to depend only on `domain` contracts
- enables multiple adapters (Prisma, REST, mocks) without changing `application`/`domain`

