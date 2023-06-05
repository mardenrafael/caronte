FROM node:18 as development

RUN useradd -ms /bin/bash caronte
USER caronte
WORKDIR /opt/app/caronte

COPY --chown=caronte package.json .
COPY --chown=caronte . .
RUN npm install
RUN npm run build

EXPOSE 3000

FROM node:18-alpine as production

USER caronte
WORKDIR /opt/app/caronte

COPY --from=development /opt/app/caronte/package.json .
RUN npm ci --omit=dev

COPY --from=development /opt/app/caronte/.env .
COPY --from=development /opt/app/caronte/dist ./dist

EXPOSE 3000

CMD [ "node", "./dist/index.js" ]
