FROM node:18

WORKDIR /opt/app/caronte

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]