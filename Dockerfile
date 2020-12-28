FROM node:12.18-alpine as builder

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

RUN npm install
COPY . /app
COPY build/ /app    
EXPOSE 80
# CMD ["serve", "-s",'build']
CMD [ "npm","start" ]
