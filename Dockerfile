FROM node:alpine
WORKDIR /home/auth/

COPY package*.json .
RUN npm ci

COPY . .
CMD ["npm","start"]