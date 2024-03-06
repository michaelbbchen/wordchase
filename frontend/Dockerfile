# Stage 1: Build the React application
FROM node:14-alpine

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

RUN npm i -g serve

CMD ["serve", "./build", "-p", "80"]

