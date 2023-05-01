FROM node:18 as development

WORKDIR /opt/app/caronte

COPY package*.json .
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine as production

WORKDIR /opt/app/caronte

COPY --from=development /opt/app/caronte/package*json .
RUN npm ci --omit=dev

COPY --from=development /opt/app/caronte/.env .
COPY --from=development /opt/app/caronte/dist ./dist


CMD [ "node", "./dist/index.js" ]
