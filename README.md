## Installation

```bash
$ npm install
```

### Configure local environment
```$bash
$ cp .env.example .env 
```

### Generate a migration
```bash
npm run typeorm migration:generate -- -n <MigrationName>
```

### Run a migrations
```bash
$ npm run typeorm migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
### Running the app

```bash
# development/debug within WebStorm (ts-node-dev)
$ npm run start:node-dev

# nodemon with remote debugger
$ npm run start:dev

# production mode
$ npm run start:prod

# default run (ts-node)
$ npm start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
