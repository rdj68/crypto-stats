# Use the official Node.js runtime as a parent image
FROM node:21.7.3

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files first for caching layer
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . /app

# Expose the port from the environment (optional, for clarity)
ARG PORT=8080
ENV PORT=${PORT}
EXPOSE ${PORT}

# Start the app
CMD ["node", "app.js"]
