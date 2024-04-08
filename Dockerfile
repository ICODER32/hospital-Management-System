FROM node:18-alpine


# Create app directory

WORKDIR /app


# Install app dependencies


COPY package.json /app
COPY package-lock.json /app
COPY . /app

RUN npm install

# Bundle app source


EXPOSE 3000

CMD [ "npm", "run", "develop"]





