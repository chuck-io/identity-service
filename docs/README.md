## Identity Service Documentation

This `docs/` folder is the canonical, repo-native documentation set for the service. It is written to be easily migrated to Notion/Confluence later.

### Contents

- **Overview**
  - `docs/overview.md`: purpose, responsibilities, boundaries
  - `docs/glossary.md`: domain language (terms used across the project)

- **Architecture**
  - `docs/ARCHITECTURE.md`: hexagonal layering rules (current state)
  - `docs/diagrams.md`: Mermaid diagrams (context/container/flows)
  - `docs/adr/`: architecture decision records

- **API**
  - `docs/api.md`: Swagger, auth, error format, pagination, endpoints overview
  - `docs/SECURITY.md`: encryption at rest + sensitive-data handling

- **Data**
  - `docs/data-dictionary.md`: schema dictionary based on `prisma/schema.prisma`

- **Operations**
  - `docs/operations.md`: env vars, local run, migrations/seed, troubleshooting

### Quick links

- Swagger UI: `http://localhost:3000/docs`
- Project root README: `README.md`

