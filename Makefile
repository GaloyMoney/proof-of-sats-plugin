check-implicit: 
	yarn tsc-check-noimplicitany
check-code: check-implicit
	yarn tsc-check
	yarn eslint-check
	yarn build

start:
	yarn tsnd --respawn --files -r tsconfig-paths/register src/servers/apollo-server.ts