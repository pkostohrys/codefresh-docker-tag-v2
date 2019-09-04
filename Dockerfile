FROM node:12.3.1

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --production

COPY src /app/src

CMD ["node", "/app/src/index"]