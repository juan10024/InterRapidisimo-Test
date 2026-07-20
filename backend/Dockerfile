# Base de dependencias
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Desarrollo
FROM base AS development
COPY . .
EXPOSE 3000
CMD ["npx", "tsx", "watch", "src/app.ts"]

# Compilación y Producción
FROM base AS builder
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY .env.production ./ 

EXPOSE 3000
CMD ["node", "dist/app.js"]