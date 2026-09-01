import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const files = globSync('**/*.{json,mjs,toml,yml,yaml,md}', {
  exclude: ['node_modules/**', '.git/**'],
});
const invalid = files.filter((file) => !readFileSync(file, 'utf8').endsWith('\n'));

if (invalid.length > 0) {
  console.error(`Files must end with a newline: ${invalid.join(', ')}`);
  process.exit(1);
}
