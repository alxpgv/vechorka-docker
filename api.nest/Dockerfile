FROM node:14-alpine As production

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

ENV DOCKER 1

# Creates a "dist" folder with the production build
RUN npm run build

ENV NODE_ENV production
USER node

# Start the server using the production build
CMD [ "node", "dist/main.js" ]