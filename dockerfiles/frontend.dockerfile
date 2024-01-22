FROM node:18-alpine3.16

WORKDIR /code

COPY frontend/package*.json .

RUN npm i
RUN npm i sass
RUN npm i axios react-query react-router-dom 

COPY frontend /code/

CMD [ "npm", "run", "dev", "--", "--host"]

EXPOSE 5173