FROM node:slim

WORKDIR /code/frontend

COPY ./package.json ./package-lock.json* /code/frontend/

RUN npm ci

COPY . /code/frontend

EXPOSE 3000

CMD ["npm", "start"]