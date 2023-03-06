FROM alpine:latest

# Install node and npm in alpine
RUN apk add --update nodejs npm

# copy dependencies file
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Copy all files
COPY . /app

# Install dependencies
RUN cd /app && npm install

#Run the app
ENTRYPOINT ["node", "/app/index.js"]