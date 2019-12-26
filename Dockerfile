FROM node:12-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

# ENV NODE_ENV development
# ENV PORT 8081
COPY . /app
CMD [ "npm", "start"]
