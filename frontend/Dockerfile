# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the local package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the local project files to the container
COPY . .

# Build the application for production
RUN npm run build

# Serve the app using a simple HTTP server
# For example, using serve package
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Inform Docker that the container is listening on port 3000
EXPOSE 3000
