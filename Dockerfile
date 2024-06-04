# Use an official Node.js runtime as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3001, which is the port we want to use for the React development server
EXPOSE 3001

# Set environment variable to specify the port (if needed)
ENV PORT=3001

ENV REACT_APP_SERVER_URL=http://nestjs:3000/

# Start the React application
CMD ["npm", "start"]
