# Use an official Node.js runtime as a parent image
FROM node:20-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

ARG API_URL
ARG CLIENT_ID
ARG AUTHORITY

RUN mkdir -p src/app/environments && \
  echo "export const environment = {" > src/app/environments/environment.ts && \
  echo "  production: true," >> src/app/environments/environment.ts && \
  echo "  apiUrl: '$API_URL'," >> src/app/environments/environment.ts && \
  echo "  clientID: '$CLIENT_ID'," >> src/app/environments/environment.ts && \
  echo "  authority: '$AUTHORITY'" >> src/app/environments/environment.ts && \
  echo "};" >> src/app/environments/environment.ts


# Build the Vite application
RUN npm run build


# Use an official Node.js runtime as a parent image
EXPOSE 4000

# Run the web service on container startup
CMD ["npm", "run", "serve:ssr:recipe-app"]