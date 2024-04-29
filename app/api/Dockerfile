FROM node:18.12.1-bullseye-slim

RUN npm install -g npm@9.1.3

ADD package.json .
ADD app.js .
ADD bin .
ADD files .
ADD routes .
ADD upload .
ADD models .
COPY . .
RUN npm install

EXPOSE 5000

CMD [ "node", "app.js" ]
