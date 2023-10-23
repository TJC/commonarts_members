FROM node:20-alpine as base
ENV NODE_ENV=production
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --only=production


FROM base as build
ENV NODE_ENV=development
COPY . .
RUN npm ci
RUN npm run build


FROM node:20-alpine as prod
RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
ENV PUBLIC_ASSETS=/app/public
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

# HEALTHCHECK --interval=1m --timeout=5s --retries=3 \
#        CMD curl --quiet http://localhost:$PORT

WORKDIR /app
COPY --from=base --chown=node:node /app/node_modules ./node_modules
COPY --from=base --chown=node:node /app/*.json ./
COPY --from=build --chown=node:node /app/dist ./dist/
COPY --chown=node:node ./public/ /app/public/

USER node
CMD ["dumb-init", "node", "dist/main.js"]
