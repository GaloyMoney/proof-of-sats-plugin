#!/bin/sh

node_modules/.bin/knex --knexfile ./database.ts migrate:status
node_modules/.bin/knex --knexfile ./database.ts migrate:latest
node_modules/.bin/knex --knexfile ./database.ts seed:run
node_modules/.bin/knex --knexfile ./database.ts migrate:status