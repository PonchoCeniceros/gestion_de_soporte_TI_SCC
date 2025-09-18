# Etapa 1: Construcción
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración de paquetes y las dependencias
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install

# Copia el código fuente del proyecto y el archivo .env
COPY src ./src
COPY tsconfig.json ./
COPY .env ./

# Compila el código TypeScript
RUN yarn build

# Etapa 2: Imagen final
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json yarn.lock tsconfig.json ./

# Instala solo las dependencias de producción
RUN yarn install --production

# Expone el puerto en el que la aplicación escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js", "--project", "/usr/src/app/tsconfig.json"]

