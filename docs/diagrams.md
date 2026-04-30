## Diagrams

All diagrams below are written in Mermaid so they can be pasted into Notion/Confluence later.

### System context

```mermaid
flowchart LR
  Client[Client / Frontend] -->|HTTP| Identity[Identity Service]
  Identity -->|SQL| Postgres[(PostgreSQL)]
```

### Hexagonal container view (internal)

```mermaid
flowchart TB
  subgraph Entry[entrypoints]
    HTTP[HTTP Controllers / DTOs]
    Filters[Exception filters]
    Guards[Auth guards]
  end

  subgraph App[application]
    UseCases[Use cases]
    AppErrors[Application errors]
  end

  subgraph Domain[domain]
    Entities[Entities / Value Objects]
    Ports[Ports (interfaces + tokens)]
  end

  subgraph Infra[infrastructure]
    Prisma[Prisma repositories]
    Crypto[Crypto/Hasher services]
    JWT[JWT signer]
  end

  HTTP --> UseCases
  Guards --> UseCases
  UseCases --> Entities
  UseCases --> Ports
  Prisma --> Ports
  Crypto --> Ports
  JWT --> Ports
  Prisma --> Postgres
```

### Login flow (sequence)

```mermaid
sequenceDiagram
  autonumber
  actor C as Client
  participant A as AuthController
  participant U as LoginUseCase
  participant R as AuthRepository (port)
  participant H as PasswordHasher (port)
  participant S as TokenSigner (port)
  participant P as Prisma (adapter)

  C->>A: POST /auth/login {email,password}
  A->>U: execute(input)
  U->>R: findUserForLoginByEmail(email)
  R->>P: query user + roles
  P-->>R: user or null
  alt invalid credentials
    U-->>A: throws UnauthorizedError
  else valid
    U->>H: verify(hash,password)
    H-->>U: true/false
    U->>S: signAccessToken(payload)
    S-->>U: {accessToken, tokenType, expiresIn}
    U-->>A: token response
    A-->>C: 200 OK
  end
```

