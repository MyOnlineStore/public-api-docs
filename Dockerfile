FROM node:10.15.0-alpine

# Required for gh-pages deployment
RUN apk add --no-cache git openssh

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .

ENTRYPOINT ["npm"]
CMD ["run"]
