## Security (encryption at rest)

### Threat model (what we are protecting)

- Avoid leaking database numeric IDs (handled by UUID-only API design)
- Protect sensitive PII like **CPF / personRegistrationNumber** if DB dumps/backups/logs are exposed

### Column-level encryption (application-managed)

We encrypt `User.personRegistrationNumber` **before writing** to the database using:

- **AES-256-GCM** (authenticated encryption)
- Random **12-byte IV** per value
- Payload stored as **base64(JSON({v,iv,ct,tag}))**

Configuration:

- `DATA_ENCRYPTION_KEY`: 32-byte key, base64 encoded

Notes:

- Key rotation is not implemented yet (future: versioned keys + re-encryption job).
- Do not log plaintext or encrypted value.
- If `DATA_ENCRYPTION_KEY` is missing, the service will fail fast on startup.

### Deterministic hash for lookup (HMAC)

We also store a deterministic, keyed hash:

- `User.personRegistrationNumberHash` = HMAC-SHA256 (base64url) using `DATA_ENCRYPTION_HMAC_KEY`

This allows:

- searching/deduplication without decrypting the CPF
- indexing lookups efficiently

It is still sensitive and must not be returned by the API.

### Database encryption (infrastructure-managed)

Application code cannot guarantee disk-level encryption. Use one of:

- Cloud DB encryption (e.g. AWS RDS / GCP Cloud SQL encryption at rest)
- Full disk encryption on the host/VM
- Encrypted volumes for Docker/VM storage

Additionally, always use **TLS** for DB connections in production.

### Docker Compose note

This repo configures Postgres to **require TLS** (`hostssl` + `ssl=on`) so data in transit is encrypted.

For **encryption at rest**, Docker Compose alone is not sufficient — use encrypted disks/volumes on the host/VM or a managed DB with encryption-at-rest guarantees.

