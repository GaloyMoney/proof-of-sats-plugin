check-implicit: 
	yarn tsc-check-noimplicitany
check-code: check-implicit
	yarn tsc-check
	yarn eslint-check
	yarn build

start-server:
	yarn tsnd --respawn --files -r tsconfig-paths/register src/servers/apollo-server.ts

clean-deps: 
	docker compose down 

start-deps: 
	docker compose up -d

start: start-deps start-server
