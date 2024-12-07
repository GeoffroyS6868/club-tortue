FROM node:16-alpine

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install && npm install typescript -g

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm","start"]