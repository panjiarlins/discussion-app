# Base image
FROM  node:lts-alpine

# Create a directory and go to the directory 
WORKDIR /app

# Copy files to the current directory
COPY package*.json .
COPY .next ./.next

# Set the environment
ENV NODE_ENV=production

# Install the dependencies
RUN npm ci --only=production --ignore-scripts

# Open the port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
