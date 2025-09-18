<p align="center">
  <img src="https://github.com/PonchoCeniceros/clean_monorepo/blob/main/project/app/src/assets/main.svg" width="500">
</p>


<p align="center">
  <img src="https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=for-the-badge">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=for-the-badge">
  <img src="https://img.shields.io/badge/Mongoose-F04D35?logo=mongoosedotws&logoColor=fff&style=for-the-badge">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=fff&style=for-the-badge">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?logo=googlegemini&logoColor=fff&style=for-the-badge">
</p>


El presente proyecto es un template para una aplicación fullstack construida con TypeScript, Node.js, MongoDB y Express (backend) así como React, Vite y Tailwind CSS (frontend) de forma minimalista y moderna, siguiendo los principios de Arquitectura Limpia. La estructura del proyecto está organizada por funcionalidades para promover la co-ubicación del código y facilitar la mantenibilidad, y está diseñado para ser robusto, escalable y fácil de mantener.

## Filosofía

*   **Minimalista:** Solo lo esencial para empezar. Sin librerías o componentes innecesarios.
*   **Moderno:** Utiliza herramientas modernas como Vite para una experiencia de desarrollo rápida.
*   **Organizado por Funcionalidad:** El código relacionado vive junto, haciendo que sea más fácil de encontrar, entender y modificar.
*   **Separación de Responsabilidades:** El código está organizado en capas (Dominio, Aplicación, Infraestructura) para aislar la lógica de negocio de los detalles de implementación.
*   **Inversión de Dependencias:** Las capas internas no dependen de las externas. Se utilizan interfaces para invertir el control, permitiendo que los detalles (como la base de datos) se puedan intercambiar fácilmente.
*   **Enfocado en el Dominio:** La lógica de negocio es el núcleo de la aplicación y no se ve afectada por cambios en frameworks o tecnologías externas.


## Estructura

El template se organiza en la carpeta `project/`, donde cada subcarpeta es un workspace independiente.

-   `project/api`: Un servicio de backend que se encarga de la lógica de negocio, la API y la comunicación con la base de datos.
-   `project/app`: Una aplicación de frontend que se encarga de la interfaz de usuario y la interacción con el cliente.


### Arquitectura Limpia

Este proyecto sigue los principios de la Arquitectura Limpia para separar las responsabilidades y mejorar la mantenibilidad. La dependencia fluye de las capas externas a las internas.

`Infraestructura -> Aplicación -> Dominio`

La estructura del directorio `src` en el backend refleja las capas de la Arquitectura Limpia:

```
/src
├───application/         # Casos de uso de la aplicación
│   └───getBussinessPartners.ts
├───auth/                # Módulo de autenticación (infraestructura)
│   ├───controllers.ts
│   ├───middlewares.ts
│   └───routes.ts
├───domain/              # Entidades y reglas de negocio del núcleo
│   ├───apiResponse.ts
│   ├───jwtPayload.ts
│   ├───role.ts
│   ├───session.ts
│   └───user.ts
├───models/              # Esquemas y modelos de la base de datos (infraestructura)
│   └───user.model.ts
├───services/            # Conectores a servicios externos (infraestructura)
│   ├───mongo.connector.ts
│   ├───redis.connector.ts
│   └───winston.connector.ts
├───api.ts               # Punto de entrada y configuración de Express
└───index.ts             # Script de inicio del servidor
```

| Capa | Descripción | Archivos de Ejemplo |
| :--- | :--- | :--- |
| **Dominio**<br>(El "Qué") | El núcleo de la aplicación. Contiene las entidades y la lógica de negocio, independientes de cualquier framework o base de datos. | - `src/domain/user.ts`<br>- `src/domain/session.ts` |
| **Aplicación**<br>(El "Cómo") | Contiene los casos de uso de la aplicación. Orquesta el flujo de datos desde y hacia el dominio, pero es independiente de la capa de infraestructura. | - `src/application/getBussinessPartners.ts` |
| **Infraestructura**<br>(El "Con Qué") | Contiene todos los detalles técnicos y componentes externos. Aquí residen los frameworks, bases de datos y las interfaces con el mundo exterior. | - `src/api.ts`<br>- `src/auth/routes.ts`<br>- `src/auth/controllers.ts`<br>- `src/models/user.model.ts`<br>- `src/services/mongo.connector.ts` |


Por otro lado, la estructura del directorio `src` en el frontend está diseñada para ser intuitiva y escalable:

```
/src
├───assets/              # Recursos estáticos como imágenes y fuentes
├───components/          # Componentes de UI reutilizables
│   ├───ui/              # Componentes genéricos (Button, Input, etc.)
│   └───sidebar/         # Ejemplo de un componente más complejo
├───features/            # Funcionalidades de la aplicación (ej. autenticación)
│   └───auth/            # Módulo de autenticación
│       ├───components/  # Componentes de React para esta funcionalidad
│       ├───hooks/       # Hooks de React para la lógica de la UI
│       ├───services.ts  # Lógica de negocio y de API
│       └───types.ts     # Tipos y definiciones de datos
├───lib/                 # Código reutilizable y de bajo nivel (ej. cliente de API)
│   └───api.ts
├───store/               # Almacenamiento de estado global (ej. Zustand, Redux)
│   └───session.ts
├───pages/               # Componentes que representan páginas completas
├───main.css             # Estilos globales
└───main.tsx             # Punto de entrada de la aplicación
```

Y en cuestión de la implementación limpia:

```
/src
├── components/          -> Infraestructura (UI)
│   └── sidebar/
│       ├── index.tsx
│       └── useSidebar.ts
├── features/
│   └── auth/
│       ├── components/  -> Infraestructura (UI)
│       │   └── LoginForm.tsx
│       ├── hooks/       -> Capa de Aplicación (Orquestación de UI)
│       │   └── useLogin.ts
│       ├── services/
│       │   └── api.ts   -> Infraestructura (Adaptador de API)
│       ├── services.ts  -> Capa de Aplicación (Casos de Uso, Interfaces)
│       └── types.ts     -> Capa de Dominio (Entidades)
└── store/
    └── session.ts       -> Infraestructura (Adaptador de State Management)
```

| Capa | Descripción | Archivos de Ejemplo |
| :--- | :--- | :--- |
| **Dominio**<br>(El "Qué") | El corazón de la aplicación. Contiene la lógica y las reglas de negocio fundamentales, sin dependencias externas. | - `src/features/auth/types.ts` |
| **Aplicación**<br>(El "Cómo") | Orquesta los casos de uso, conectando el dominio con la infraestructura a través de interfaces. | - `src/features/auth/services.ts`<br>- `src/features/auth/hooks/useLogin.ts` |
| **Infraestructura**<br>(El "Con Qué") | Contiene los detalles técnicos y las implementaciones concretas de las interfaces. | - `src/features/auth/services/api.ts`<br>- `src/features/auth/components/`<br>- `src/components/`<br>- `src/store/session.ts`<br>- `src/main.tsx` |

## Cómo Empezar

### 1. Instalación de Dependencias

Para instalar todas las dependencias de todos los paquetes (workspaces), ejecuta el siguiente comando **desde la raíz del proyecto**:

```bash
yarn install
```

Este comando leerá los `package.json` de cada workspace y de la raíz, instalando todo lo necesario.

### 2. Configuración de Variables de Entorno

Cada paquete tiene su propio archivo de variables de entorno. Deberás crearlos a partir de los archivos de ejemplo.

-   **Backend:** Copia `project/api/.env.example` a `project/api/.env` y ajusta las variables (puerto, URLs de bases de datos, secretos de JWT, etc.).

    ```env
    # === GENERALES ===
    # Título y descripción para la documentación de la API
    TITLE=Clean API
    DESCRIPTION=API para el proyecto de arquitectura limpia con el stack MERN
    VERSION=0.0.1
    API_URL=http://localhost:3000/v1

    # === CONFIGURACIONES BACKEND NODEJS ===
    # Puerto en el que correrá el servidor
    PORT=3000
    # Entorno de desarrollo (development, production, etc.)
    NODE_ENV=development

    # === CREDENCIALES JWT ===
    # Clave secreta para firmar los JSON Web Tokens
    SECRET_KEY=tu_super_secreto_aqui
    # Número de rondas de salt para el hash de contraseñas con bcrypt
    SALT_ROUNDS=10

    # === CREDENCIALES DE INFRAESTRUCTURA ===
    # URI de conexión a la base de datos MongoDB
    MONGO_DB_URL=mongodb://localhost/clean_db
    # URI de conexión a Redis para el manejo de sesiones
    REDIS_SESSION_URI=redis://localhost:6379
    # Ruta del archivo para los logs de la aplicación
    LOGGER_FILE=logs/logfile.log

    # === FRONTEND Y CORS ===
    # URL del frontend permitida para realizar peticiones (CORS)
    FRONTEND_AVAILABLE_URL=http://localhost:5173
    ```

-   **Frontend:** Copia `project/app/.env.example` a `project/app/.env` y configura la URL del backend (`VITE_API_URL`).


### 3. Ejecutar los Proyectos en Modo Desarrollo

Para ejecutar un script de un workspace específico, se utiliza el comando `yarn workspace <nombre_del_workspace> <script>`.

**Para iniciar el backend:**

```bash
yarn workspace api dev
```

**Para iniciar el frontend:**

```bash
yarn workspace app dev
```

## Manejo de Dependencias en Workspaces

**Añadir una dependencia a un workspace específico:**

```bash
# Ejemplo: añadir axios solo al frontend
yarn workspace app add axios
```

**Añadir una dependencia de desarrollo a un workspace específico:**

```bash
# Ejemplo: añadir jest solo al backend
yarn workspace api add jest -D
```

**Añadir una dependencia a la raíz (para todos los workspaces):**

```bash
# Útil para herramientas como prettier o eslint
yarn add prettier -W -D
```

-   La bandera `-W` (o `--ignore-workspace-root-check`) permite añadir la dependencia a la raíz del proyecto.

## Docker (Backend)
en proceso de desarrollo...

## Puntos Clave a Recordar

1.  **Comandos desde la Raíz:** Ejecuta siempre `yarn install` y los comandos `yarn workspace ...` desde la raíz del monorepo.
2.  **Dependencias Hoisted:** Yarn intentará "elevar" (hoist) las dependencias comunes a la carpeta `node_modules` de la raíz para optimizar el espacio.
3.  **Scripts:** Revisa el archivo `package.json` de cada workspace para ver todos los scripts disponibles (`build`, `test`, `lint`, etc.).

### Referencias

*   [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Robert C. Martin (Uncle Bob)
*   [explicit architecture: ddd, hexagonal, onion, clean](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
versión 0.0.1
