-- Shared database for multiple microservices.
-- Each microservice uses its own schema.

CREATE SCHEMA IF NOT EXISTS identity;

-- Optional: make identity the default schema for the postgres user in local dev.
-- Prisma will still explicitly target the schema via DATABASE_URL ?schema=identity.
ALTER ROLE postgres SET search_path = identity, public;

