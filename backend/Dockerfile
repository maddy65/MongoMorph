# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["node", "server.js"]
