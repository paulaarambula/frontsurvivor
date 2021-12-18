FROM node:14
WORKDIR /usr/src
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install
CMD ["yarn", "start"]