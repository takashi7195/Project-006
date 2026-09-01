import { existsSync } from 'node:fs';

const required = ['.env.example', 'public', 'tests', 'pyproject.toml'];
const missing = required.filter((path) => !existsSync(path));

if (missing.length > 0) {
  console.error(`Missing workspace configuration: ${missing.join(', ')}`);
  process.exit(1);
}
