# Stage 1: Build the React application
FROM node:14-alpine as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) from your project into the Docker container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your project into the Docker container
COPY . .

# Build your React application
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
