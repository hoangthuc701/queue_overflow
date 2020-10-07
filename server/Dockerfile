# create image based on the officail Node from dockerhub
FROM node:13-alpine

# change directory so that our commands run inside this new directory
WORKDIR /app

# get all code need to run the app
COPY . .

# install 
RUN npm install

# run app
CMD ["npm", "run", "start"]