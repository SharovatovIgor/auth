FROM node:20-alpine AS development

WORKDIR ./

COPY package.json ./

COPY package-lock.json ./

COPY tsconfig.json ./

RUN npm install

RUN npm run build