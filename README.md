## Requirements

1. Use nodeJS (not Type Script)
2. Create an express server.
3. Create 3 end points
    3.1. Get: person/:id
    3.2. get: person/list
      3.2.1. This should have the ability to filter the data by firstName or lastName.
      3.2.2. Do not worry about pagination.
    3.3 Post: insert a new person in the array.
4. Must include unit tests for each end point.
5. Create dockerized relational database insert the below mentioned records into a table

## Dataset for postgresql
```
[
  { "id": 1, "firstName": "Mickey", "lastName": "Mouse" },
  { "id": 2, "firstName": "Donald ", "lastName": "Duck" },
  { "id": 3, "firstName": "Minnie", "lastName": "Mouse" },
  { "id": 4, "firstName": "Daisy", "lastName": "Duck" },
  { "id": 5, "firstName": "Pluto ", "lastName": "Dog" },
  { "id": 6, "firstName": "Chip", "lastName": "Chipmuck" },
  { "id": 7, "firstName": "Dale ", "lastName": "Chipmuck" },
  { "id": 8, "firstName": "Olive", "lastName": "Oil" },
  { "id": 9, "firstName": "Bruce", "lastName": "Wayne" },
  { "id": 10, "firstName": "Peter", "lastName": "Parker" },
  { "id": 11, "firstName": "Clark", "lastName": "Kent" },
  { "id": 12, "firstName": "Loise", "lastName": "Lane" },
  { "id": 13, "firstName": "Luke", "lastName": "Skywalker" }
]
```

## Directory structure
```
kbra-node/
├── src/
│   ├── app.js
│   ├── __tests__/
│   │   └── app.test.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   │   ├── __tests__/
│   │   │   └── database.test.js
│   ├── database/
│   │   ├── index.js
│   │   ├── __tests__/
│   │   │   ├── index.test.js
│   │   │   ├── conn.test.js
│   │   │   └── queries.test.js
│   │   ├── conn.js
│   │   └── queries.js
│   ├── routes/
│   │   ├── persons.js
│   │   └── __tests__/
│   │       └── persons.test.js
│   ├── controllers/
│   │   ├── persons.js
│   │   └── __tests__/
│   │       └── persons.test.js
│   ├── middleware/
│   │   ├── validation.js
│   │   └── __tests__/
│   │       └── validation.test.js
│   └── utils/
│       ├── validators.js
│       └── __tests__/
│           └── validators.test.js
├── test/
│   └── integration/
│       └── app.test.js
├── docker-compose.yml
├── init.sql
├── package.json
├── eslint.config.js
├── knip.json
├── jest.config.js
└── .husky/
    └── pre-commit
```


## Local testing
* run `pnpm|npm|yarn run dev`;

### get specific user
`curl -X GET http://localhost:3000/person/9`

### validation error for id
`curl -X GET http://localhost:3000/person/abc`

### insert new person
```
curl -X POST http://localhost:3000/person/ \
    -H "Content-Type: application/json" \
    -d '{"firstName": "Goofy", "lastName": "Goof"}'
```

### list with filter
```
curl -X POST http://localhost:3000/person/list \
     -H "Content-Type: application/json" \
     -d '{"lastName": "Mouse"}'
```


## Docker handlers
1. destroy the volume to reset init.sql: `docker compose down -v`;
2. rebuild image `docker compose build`
3. start anew `docker compose up -d`