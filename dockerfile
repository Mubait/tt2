FROM node:latest

WORKDIR /tt

COPY . .

RUN npm i

CMD ["npm", "run", "dev"]
