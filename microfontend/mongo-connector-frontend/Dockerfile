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
EXPOSE 4202
# Install dos2unix
RUN apt-get update && apt-get install -y dos2unix
# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]
