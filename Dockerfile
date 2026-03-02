# Development Dockerfile for the Vite React application

FROM node:18-alpine

# set working directory
WORKDIR /app

# copy dependency definitions
COPY package.json package-lock.json* ./

# install dependencies
RUN npm ci

# copy the rest of the source code
COPY . .

# expose vite's default port
EXPOSE 5173

# start the development server
CMD ["npm", "run", "dev"]
