FROM node:18-alpine

# ------------------
# Server
# ------------------
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server .

# ------------------
# Client
# ------------------
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --legacy-peer-deps
COPY client .
RUN npm run build

# ------------------
# Run
# ------------------
WORKDIR /app
EXPOSE 4000

CMD ["node", "server/server.js"]
