# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app



# install app dependencies
COPY package.json ./
COPY package-lock.json ./
# COPY init.sh /run/
# RUN chmod +x /run/init.sh
RUN npm install --silent

# add app
COPY . ./

EXPOSE 3000/tcp
EXPOSE 3000/udp

# start app
CMD ["npm", "run", "start"]