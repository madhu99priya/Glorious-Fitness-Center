# === Backend Dockerfile ===

# 1. Use Node.js LTS base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Set proxy for npm (replace with your proxy if needed)
ARG HTTP_PROXY
ARG HTTPS_PROXY
ENV HTTP_PROXY=${HTTP_PROXY}
ENV HTTPS_PROXY=${HTTPS_PROXY}

# Optional: configure npm explicitly
RUN npm config set proxy ${HTTP_PROXY} \
    && npm config set https-proxy ${HTTPS_PROXY} \
    && npm config set strict-ssl false

# 4. Copy package files and install dependencies (including runtime)
COPY package*.json ./
RUN npm install --omit=dev

# 5. Copy source code
COPY . .

# 6. Expose backend port
EXPOSE 5000

# 7. Start the server
CMD ["npm", "run", "dev"]
