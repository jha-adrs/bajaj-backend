##Docker file for backend
FROM node:20-alpine AS build

RUN apk update && \
    apk add --no-cache curl vim bash && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

#Copies the package.json and package-lock.json files to the working directory
COPY package*.json ./

RUN npm install

# Copy the rest of the application

COPY . .

EXPOSE 80

WORKDIR /usr/src/app/server
CMD ["npm", "start"]