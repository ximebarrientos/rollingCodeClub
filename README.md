# Rolling Code Club - Sistema de Gestión de Fútbol

## 📋 Descripción

Rolling Code Club es una aplicación web completa para la gestión de un club de fútbol. Desarrollada con React y Vite, ofrece funcionalidades para la reserva de canchas, gestión de inventario de productos deportivos, administración de usuarios y turnos, además de información general del club.

## 🎯 Características Principales

### 🏟️ Reserva de Canchas
- Visualización de canchas disponibles con imágenes y detalles
- Sistema de reserva de turnos por horario
- Información de precios y categorías de canchas

### 🛍️ Tienda de Productos
- Catálogo completo de productos deportivos
- Carrito de compras integrado
- Productos organizados por categorías

### 👥 Gestión de Usuarios
- Sistema de registro y autenticación
- Diferentes roles de usuario (cliente/administrador)
- Protección de rutas administrativas

### 🔧 Panel de Administración
- Gestión completa de productos (CRUD)
- Administración de usuarios
- Control de canchas disponibles
- Supervisión de turnos ocupados

### 📱 Interfaz de Usuario
- Diseño responsive con Bootstrap
- Navegación intuitiva
- Tema oscuro profesional

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework:** React 19
- **Enrutamiento:** React Router 7
- **Build Tool:** Vite
- **UI Framework:** Bootstrap 5.3.8 + Bootswatch Slate Theme
- **Iconos:** Bootstrap Icons
- **Formularios:** React Hook Form
- **Alertas:** SweetAlert2
- **Linter:** ESLint

## 📦 Dependencias Principales

```json
{
  "react": "^19.1.1",
  "react-router": "^7.9.2",
  "bootstrap": "^5.3.8",
  "react-bootstrap": "^2.10.10",
  "sweetalert2": "^11.24.1"
}
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/ximebarrientos/rollingCodeClub.git
   cd rollingCodeClub
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   - Crea un archivo `.env` en la raíz del proyecto
   - Configura las URLs de las APIs necesarias

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre en el navegador**
   - Navega a `http://localhost:5173` (o el puerto que indique Vite)


## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── pages/           # Páginas principales
│   │   ├── inicio/      # Página de inicio
│   │   ├── tienda/      # Secciones de tienda
│   │   ├── turnos/      # Sistema de reservas
│   │   ├── cancha/      # Gestión de canchas
│   │   ├── producto/    # Gestión de productos
│   │   ├── usuario/     # Gestión de usuarios
│   │   └── ...          # Otras páginas
│   ├── shared/          # Componentes compartidos
│   └── routes/          # Protección de rutas
├── helpers/             # Funciones auxiliares y APIs
├── data/               # Archivos de datos estáticos
├── assets/             # Recursos estáticos
└── App.jsx             # Componente principal
```

## 🎨 Tema y Estilos

La aplicación utiliza el tema **Slate** de Bootswatch, que proporciona:
- Paleta de colores oscura profesional
- Componentes Bootstrap personalizados
- Iconografía de Bootstrap Icons
- Diseño responsive optimizado

## 👤 Autores

- **Claudia Ximena Barrientos** [https://github.com/ximebarrientos]
- **Alessandra Borges Licciardi** [https://github.com/Aleblok]
- **Jose David Baza** [https://github.com/JoseBaza91]

## ✨Link al repositorio del backend
https://github.com/ximebarrientos/rollingCodeClubBackend