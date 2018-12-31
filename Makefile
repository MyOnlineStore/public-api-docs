ARGS = $(filter-out $@,$(MAKECMDGOALS))
MAKEFLAGS += --silent

generate-env:
	echo "PORT=8080" >> .env

initialize: generate-env rebuild

install:
	docker run --rm -it -v ${CURDIR}:/usr/app public-api-docs install ${ARGS}

rebuild:
	docker build -t public-api-docs .

run:
	docker run --rm -it -v ${CURDIR}:/usr/app public-api-docs run ${ARGS}

start:
	docker run --rm -v ${CURDIR}:/usr/app -p ${PORT}:8080 public-api-docs run start

%:
	@:
