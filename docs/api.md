## API

### Swagger

- Swagger UI: `http://localhost:3000/docs`
- Toggle: `SWAGGER_ENABLED=true|false` (env)

### Authentication

This API uses **JWT Bearer** tokens.

- Provide token using `Authorization: Bearer <jwt>`
- In Swagger UI, use the **Authorize** button and paste the JWT (with or without the `Bearer ` prefix)

Endpoints protected by `JwtAuthGuard` are annotated in Swagger with Bearer auth.

### Authorization (roles)

Role restrictions are enforced with:

- `@UseGuards(JwtAuthGuard, RolesGuard)`
- `@Roles(...)` decorator

### Error handling

Application errors are translated to HTTP by `ApplicationErrorFilter`.

- `UnauthorizedError` -> HTTP 401
- `BadRequestError` -> HTTP 400
- `NotFoundError` -> HTTP 404

### Pagination

List endpoints use `PaginationDto` (`skip`, `take`) through query params.

### Endpoints overview

The service exposes UUID-based CRUD endpoints for:

- roles
- companies
- users
- teachers

For the authoritative list, always refer to Swagger UI.

