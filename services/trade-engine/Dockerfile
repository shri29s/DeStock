FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Create directory for ABI files
RUN mkdir -p /app/abi

USER nodejs

EXPOSE 3002 8080

CMD ["node", "index.js"]
