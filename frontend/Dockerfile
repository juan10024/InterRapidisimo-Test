# Base de dependencias
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Desarrollo
FROM base AS development
# Ya estamos en /app, solo copiamos el resto
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Compilación
FROM base AS builder
COPY . .
RUN npm run build

# Producción
FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]