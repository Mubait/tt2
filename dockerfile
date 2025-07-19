FROM node:latest

WORKDIR /tt

COPY . .

RUN npm i

EXPOSE 1010

CMD ["npm", "run", "dev"]
