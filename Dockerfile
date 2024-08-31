# Use the latest Node.js official image as the base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the entire backend code to the container
COPY . .

# Expose the port that your backend runs on
EXPOSE 5000

# Command to start your backend server
CMD ["node", "server.js"]