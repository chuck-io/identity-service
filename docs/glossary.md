## Glossary (Domain language)

This glossary defines the terms used across the service in code, database, and API.

### Identity terms

- **User**
  - A person that can authenticate into the platform.
  - Has a unique `email`.
  - May belong to a company (`companyId`) depending on role.

- **Role**
  - Authorization label used to protect endpoints and enable actions.
  - Assigned to users through `UserRole`.

- **Teacher**
  - A specialization linked to a user (`Teacher.userId -> User.id`).
  - Represents additional teacher-specific data.

### Organization terms

- **Company**
  - Organization / tenant-like grouping.
  - Identified by `companyId` (business identifier) and `uuid` (API identifier).

- **Enterprise user**
  - A user holding role `ENTRERPRISE` (spelling as used in code/seed).
  - Used as an “enterprise boundary” for company-related flows.

### Technical terms

- **Port**
  - An interface + token defined in `src/domain/ports`.
  - Consumed by use cases (`application`) and implemented by adapters (`infrastructure`).

- **Adapter**
  - A concrete implementation of a port (e.g. Prisma repository, JWT signer).

