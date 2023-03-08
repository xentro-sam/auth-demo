FROM alpine:latest

# Install node and npm in alpine
RUN apk add --update nodejs npm

WORKDIR /app

# copy dependencies file
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Copy all files
COPY . /app

# Install dependencies
RUN cd /app && npm install

#Run the app
ENTRYPOINT ["npx", "nodemon", "/app/index.js"]