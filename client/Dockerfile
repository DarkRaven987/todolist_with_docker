FROM node:16 as build

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/