ARGS = $(filter-out $@,$(MAKECMDGOALS))
MAKEFLAGS += --silent

generate-env:
ifeq ($(OS),Darwin)
	echo "APP_VOLUME=.:/usr/app:delegated" > .env
else
	echo "APP_VOLUME=.:/usr/app" > .env
endif

initialize: generate-env pull install start

install:
	docker-compose run connect-documentation npm install ${ARGS}

npm:
	docker-compose exec connect-documentation npm ${ARGS}

run:
	docker-compose exec connect-documentation npm run ${ARGS}

pull:
	docker-compose pull --parallel

restart: stop start

start:
	docker-compose up --build -d

stop:
	docker-compose stop -t1

%:
	@:
