.PHONY: bootstrap check format lint test serve python-check

bootstrap:
	npm ci

check: lint test
	npm run format:check

format:
	npm run format

lint:
	npm run lint

python-check:
	python3 -m ruff check .

test:
	npm test

serve:
	npm run serve
