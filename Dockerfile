FROM node:latest AS build-env
ARG BUILD_VERSION
WORKDIR /app

# Copy package and restore as distinct layers
COPY package.json ./
RUN yarn install

COPY . ./
RUN yarn build

# Build runtime image
FROM nginx:latest

WORKDIR /app
COPY --from=build-env /app/build .
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
