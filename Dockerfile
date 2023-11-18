FROM node:alpine
WORKDIR /home/auth/

RUN git clone https://github.com/k1941996/authUsingJWT.git
RUN npm ci

COPY . .
CMD ["npm","start"]