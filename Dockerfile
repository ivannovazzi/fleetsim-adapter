FROM node:23-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:23-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --production

COPY --from=builder /app/dist ./dist

# Default environment variables
ENV NODE_ENV=production \
    PORT=3001 \
    API_URL=https://graphql-dev.flaredispatch.com/graphql

CMD ["npm", "start"]