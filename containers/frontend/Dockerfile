# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Pass build arguments as environment variables
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Copy the application source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app and expose Prometheus metrics
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install serve for serving the React app
RUN npm install -g serve

# Install Prometheus client library
RUN npm install prom-client

# Copy only the production build from the previous stage
COPY --from=build /usr/src/app/build ./build

# Copy Prometheus metrics server script
COPY prometheus-metrics.js ./prometheus-metrics.js

# Expose ports for the React app and Prometheus metrics
EXPOSE 3000
EXPOSE 9091

# Run the app and metrics server
CMD ["node", "prometheus-metrics.js"]

