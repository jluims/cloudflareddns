FROM node:20-alpine3.20
WORKDIR /app

COPY . .

RUN yarn install --prod=false

RUN yarn cache clean

RUN yarn build

EXPOSE 4000

CMD ["node", "dist/index.js"]