# Use the official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN npm install --production

# Install PM2 globally
RUN npm install pm2 -g

# Expose the port your Fastify app will listen on
EXPOSE 3000

# Use PM2 to start your app
CMD ["pm2-runtime", "start", "app.js"]
