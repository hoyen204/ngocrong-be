FROM node:18.16-alpine

WORKDIR /home/src

COPY ./package.json .
COPY ./yarn.lock .
COPY ./tsconfig.json .

RUN yarn && yarn cache clean

COPY . .
RUN yarn build

CMD ["yarn", "start:prod"]
