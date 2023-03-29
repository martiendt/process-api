# Pointhub API Starter

## Features
- **Compression** Using gzip compression with [Compression](https://github.com/expressjs/compression)
- **CORS** Cross-Origin Resource-Sharing enabled using [Cors](https://github.com/expressjs/cors)
- **Environment Variable** using [dotenv](https://www.npmjs.com/package/dotenv)
- **Secure HTTP Headers** using [Helmet](https://github.com/helmetjs/helmet)

## Development Stack
- [Node.js](https://nodejs.org) JavaScript run-time environment
- [Express](https://expressjs.com) Node.js framework
- [Typescript](https://www.typescriptlang.org/) for type checking
- [Jest](https://jestjs.io/), [ts-jest](https://www.npmjs.com/package/ts-jest) for unit testing
- [Supertest](https://www.npmjs.com/package/supertest) for e2e testing
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting

## Services
- [MongoDB](https://www.mongodb.com/docs/drivers/node/current/)

## Contribution Guide

---

### Database for development

Since transactions are built on concepts of logical sessions they require mechanics which are only available in a replica set environment.

Choose one of the options that you prefer

- Install offline MongoDB database replica set using docker
[Docker MongoDB RS](https://github.com/point-hub/docker-mongodb-rs)

- Use online Database as a Service (DBaaS) [Atlas MongoDB](https://www.mongodb.com/atlas/database)

### Quickstart

#### With Docker

```bash
docker-compose up
```

#### Without Docker

```bash
cp .env.example .env
npm install
npm run dev
```

### Deployment

```bash
docker build -t pointhub/papi-starter .
```