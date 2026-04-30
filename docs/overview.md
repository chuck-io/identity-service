## Overview

### What this service is

Identity Service is a NestJS service responsible for **authentication and identity-related data**:

- users and their profiles
- roles and authorization checks (role-based)
- company access boundaries (where applicable)

This service exposes an HTTP API with Swagger documentation at runtime.

### What this service is not

- a general “school” domain system
- a billing service
- a monolith entrypoint for all services

### High-level responsibilities

- **Authentication**: login and access token issuance (JWT)
- **Authorization**: role checks enforced via guards
- **Identity data**: CRUD for roles/companies/users/teachers (UUID-based API)

### Key constraints and principles

- **UUID-only API**: numeric database IDs are never exposed externally.
- **Hexagonal architecture**:
  - domain is framework-free
  - application orchestrates use cases
  - entrypoints adapt protocols (HTTP)
  - infrastructure contains adapters (Prisma, crypto, JWT signing)

