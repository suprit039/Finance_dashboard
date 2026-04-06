FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies (only production if needed, but here we do all for setup)
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
