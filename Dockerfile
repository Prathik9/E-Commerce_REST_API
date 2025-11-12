# Use official Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the source code
COPY . .

# Expose port
EXPOSE 4000

# Set environment variables (optional defaults)
ENV NODE_ENV=production

# Start command
CMD ["npm", "start"]
