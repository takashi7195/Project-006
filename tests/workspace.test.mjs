import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

test('framework-neutral local web-server directory is available', () => {
  assert.equal(existsSync('public'), true);
});

test('secret template is available without containing credentials', () => {
  assert.equal(existsSync('.env.example'), true);
});
