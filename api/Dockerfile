# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy your actual server code
COPY . .

# Set port for container
EXPOSE 3001

# Start your server
CMD ["node", "server.js"]