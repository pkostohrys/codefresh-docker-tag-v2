FROM node:12.3.1

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install --production

COPY src /app/src

CMD cd /app && ls && npm run start