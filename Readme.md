# advanced

Project scaffold for `advanced`.

Folders:
- config
- Services
- Controllers
- Middlwares
- Models

Files:
- routes.js
- app.js
- index.js

Quick start:

```bash
npm install express
node index.js
```

## Config files

- `config/env.js`: centralizes environment configuration and defaults used across the app (port, database host/user/password/name/port). It reads from `process.env` and exports an object so other modules can import runtime configuration in a single place.

- `config/db.js`: provides the MySQL connection helper. It imports the configuration from `config/env.js`, creates and opens a MySQL connection (using the `mysql` package), logs connection success/errors, and exports a function (`getConnection`) that returns the active connection for use in services/controllers.

Note: both files use ESM (`export`/`import`) to match the project's `type: "module"` setting in `package.json`.
