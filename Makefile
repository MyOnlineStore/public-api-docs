ARGS = $(filter-out $@,$(MAKECMDGOALS))
MAKEFLAGS += --silent

build:
	docker run --rm -it -v "/home/mike/dev/services/public-api-docs:/usr/output" public-api-docs

update:
	docker build -t public-api-docs .

%:
	@:
