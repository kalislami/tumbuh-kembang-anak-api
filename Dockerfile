FROM node:16

# Install MongoDB dependencies and MongoDB itself in a single layer
RUN apt-get update && apt-get install -y \
    gnupg \
    wget \
    lsb-release \
    ca-certificates \
    netcat \
    && curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | tee /etc/apt/trusted.gpg.d/mongodb.asc \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/debian $(lsb_release -cs)/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list \
    && apt-get update && apt-get install -y mongodb-org \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV MONGO_URI=mongodb://localhost:27017/mongodb
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Create MongoDB data directory and ensure correct permissions
RUN mkdir -p /app/data/db && chown -R node:node /app/data/db

EXPOSE 3000

USER node

# Run MongoDB in the background and then start the Node.js application
CMD mongod --dbpath /app/data/db --bind_ip_all --logpath /app/data/db/mongodb.log & \
    while ! nc -z localhost 27017; do echo "Waiting for MongoDB..."; sleep 2; done; \
    node index.js
