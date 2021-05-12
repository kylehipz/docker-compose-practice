FROM node:14.15.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./ 

CMD ["npm", "run", "dev"]