# 실행 방법

docker compose up -d mysql

1. npm install
2. npm run migration:run
3. npm run seed:run
4. npm run start:dev

### db 세팅

현재 entity를 읽어와 이에 해당하는 쿼리 생성해줌
npm run migration:generate -- src/database/migrations/파일이름
npm run migration:generate:dev -- src/database/froggy-dev_migrations/파일이름
npm run migration:generate:live -- src/database/froggy-live_migrations/파일이름

database/migrations/에 있는 쿼리 실행
npm run migration:run:live
npm run migration:run:dev

테이블 드랍, 모든 테이블 드랍되니 조심 !
npm run schema:drop

## Description

NestJS REST API boilerplate for typical project

[Full documentation here](https://github.com/brocoders/nestjs-boilerplate/blob/main/docs/index.md)

## Table of Contents

- [Features](#features)
- [Quick run](#quick-run)
- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Automatic update of dependencies](#automatic-update-of-dependencies)
- [Database utils](#database-utils)
- [Tests](#tests)

## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer), [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google, Twitter).
- [x] Admin and User roles.
- [x] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

## Quick run

```bash
git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
cd my-app/
docker compose up -d
```

For check status run

```bash
docker compose logs
```

## Comfortable development

```bash
git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
cd my-app/
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker compose up -d postgres adminer maildev redis
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Links

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080
- Maildev: http://localhost:1080

## Automatic update of dependencies

If you want to automatically update dependencies, you can connect [Renovate](https://github.com/marketplace/renovate) for your project.

## Database utils

Generate migration

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests in Docker

```bash
docker compose -f docker-compose.ci.yaml --env-file .env -p ci up --build --exit-code-from api && docker compose -p ci rm -svf
```

## Test benchmarking

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users
```

## API DOCS

visit http://localhost:3000/docs
