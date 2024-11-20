# Use an official Node runtime as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the entire project directory into the working directory
COPY . .

# Expose port 4200 to the outside world
EXPOSE 4200

# Start the Angular app using Angular CLI's built-in server
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]