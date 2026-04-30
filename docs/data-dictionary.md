## Data dictionary (PostgreSQL via Prisma)

Source of truth: `prisma/schema.prisma`.

Conventions:

- API uses **UUID** (`uuid`) as external identifier; numeric `id` is internal only.
- Timestamps are stored in `created_at` and `updated_at`.

### Role (`role`)

- **Primary key**: `id` (autoincrement)
- **External identifier**: `uuid` (UUID, unique)
- **Fields**
  - `name`: unique role name
  - `description`: optional text
  - `createdAt` / `updatedAt`
- **Relations**
  - one-to-many to `UserRole` (`Role.users`)

### User (`user`)

- **Primary key**: `id` (autoincrement)
- **External identifier**: `uuid` (UUID, unique)
- **Fields**
  - `companyId`: nullable business identifier (links to `Company.companyId`)
  - `firstName`, `lastName`
  - `email`: unique
  - `password`: password hash (never returned by API)
  - `personRegistrationNumber`: encrypted PII (see `docs/SECURITY.md`)
  - `personRegistrationNumberHash`: deterministic hash for lookup/indexing
  - `createdAt` / `updatedAt`
- **Indexes**
  - `companyId`
  - `personRegistrationNumberHash`
- **Relations**
  - optional many-to-one to `Company` by `companyId` (on delete: set null)
  - one-to-many to `UserRole`
  - one-to-many to `UserCompany`
  - optional one-to-one to `Teacher`

### Company (`company`)

- **Primary key**: `id` (autoincrement)
- **External identifier**: `uuid` (UUID, unique)
- **Business identifier**: `companyId` (unique, referenced by `User.companyId`)
- **Fields**
  - `name`
  - `companyRegistrationNumber`
  - `createdAt` / `updatedAt`
- **Relations**
  - one-to-many to `User` via `companyId` relation
  - one-to-many to `UserCompany`

### UserRole (`user_role`)

- **Primary key**: `id` (autoincrement)
- **External identifier**: `uuid` (UUID, unique)
- **Fields**
  - `userId` (FK -> `User.id`)
  - `roleId` (FK -> `Role.id`)
  - `createdAt` / `updatedAt`
- **Constraints**
  - unique (`userId`, `roleId`) to prevent duplicates
- **Relations**
  - many-to-one to `User` (cascade on delete)
  - many-to-one to `Role` (cascade on delete)

### UserCompany (`user_company`)

- **Primary key**: `id` (autoincrement)
- **External identifier**: `uuid` (UUID, unique)
- **Fields**
  - `userId` (FK -> `User.id`)
  - `companyId` (FK -> `Company.id`)
  - `createdAt` / `updatedAt`
- **Constraints**
  - unique (`userId`, `companyId`) to prevent duplicates
- **Relations**
  - many-to-one to `User` (cascade on delete)
  - many-to-one to `Company` (cascade on delete)

### Teacher (`teacher`)

- **Primary key**: `id` (autoincrement)
- **External identifier**: `uuid` (UUID, unique)
- **Fields**
  - `userId`: unique FK -> `User.id` (enforces 1:1)
  - `subject`
  - `createdAt` / `updatedAt`
- **Relations**
  - one-to-one to `User` (cascade on delete)

