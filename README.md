# MyOnlineStore API Specification
[![Test](https://github.com/MyOnlineStore/public-api-docs/actions/workflows/ci.yaml/badge.svg)](https://github.com/MyOnlineStore/public-api-docs/actions/workflows/ci.yaml)
[![Deploy](https://github.com/MyOnlineStore/public-api-docs/actions/workflows/deploy.yaml/badge.svg)](https://github.com/MyOnlineStore/public-api-docs/actions/workflows/deploy.yaml)

## Links

- [Documentation](https://myonlinestore.github.io/public-api-docs/)
- [Sandbox](https://myonlinestore.github.io/public-api-docs/swagger-docs/)
- [Raw OpenAPI file](https://myonlinestore.github.io/public-api-docs/openapi.yaml)

## Development

### Setup
* Install [Docker](https://docs.docker.com/install/)
  * Alternative: install npm
* Run `make initialize`

### Usage

* **make run clean**: Clear build output
* **make run build**: Build new content for gp-pages
* **make run test**: Validate swagger specification
* **make start**: Run preview server
* **make install <package>**: Install additional npm packages
* **make rebuild**: Apply docker container changes 

### Deployment

Deployment is done automatically (by Travis) upon pushing changes to master 
