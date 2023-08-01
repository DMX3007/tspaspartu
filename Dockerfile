FROM node:18

WORKDIR /usr/app

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y npm && \
    npm install

COPY . .

CMD ["npm", "run", "dev"]