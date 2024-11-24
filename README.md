# 🛍️ Fake Store API App - Expo React Native

Bienvenido al proyecto **Fake Store API App**, una aplicación creada con **React Native** y **Expo** que consume la API de [FakeStore](https://fakestoreapi.com/) para mostrar productos, detalles de productos y realizar búsquedas.

---

## 🚀 Características Principales

- **Listar Productos**: Obtén productos desde la API real de Fake Store.
- **Detalles de Producto**: Visualiza información detallada al seleccionar un producto.
- **Búsqueda**: Filtra productos usando una barra de búsqueda interactiva.
- **Manejo de Errores**: Redirige al login si la autenticación falla.

---

## 🧰 Librerías Utilizadas

### 📦 Dependencias de Producción

- **React Native**: Framework para construir aplicaciones móviles nativas.
- **Expo**: Plataforma para desarrollo rápido en React Native.
- **@react-navigation/native**: Navegación en la aplicación.
- **@react-native-async-storage/async-storage**: Manejo de almacenamiento local.
- **axios**: Cliente HTTP para consumir la API.
- **zustand**: Manejo del estado de la aplicación.
- **expo-router**: Sistema de enrutamiento basado en archivos.

### 📦 Dependencias de Desarrollo

- **jest**: Framework de pruebas.
- **@testing-library/react-native**: Biblioteca para pruebas de interfaces en React Native.
- **jest-expo**: Preset de Jest para Expo.
- **axios-mock-adapter**: Simula respuestas de `axios` para pruebas.

---

## 🛠️ Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- **Node.js** (v16 o superior): [Descargar Node.js](https://nodejs.org/)
- **Expo CLI**: Instálalo globalmente con:
  ```bash
  npm install -g expo-cli

## ⚙️ Instalación y Configuración
Sigue estos pasos para configurar y ejecutar el proyecto:

## 1️⃣ Clonar el Repositorio
Clona el proyecto desde el repositorio:

bash
Copy code
git clone 
cd carpeta

## 2️⃣ Instalar Dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

bash
Copy code
npm install
## 3️⃣ Ejecutar el Proyecto
Para iniciar el servidor de desarrollo, usa el siguiente comando:

bash
Copy code
 ```bash
expo start
```
Esto abrirá una ventana en tu navegador donde podrás elegir emular la aplicación en un dispositivo físico (usando la aplicación Expo Go) o en un emulador.

## 4️⃣ Configurar la API de Fake Store
No es necesario configurar la API porque se utiliza el endpoint público de Fake Store API.

## 🧪 Ejecutar Pruebas
El proyecto incluye pruebas unitarias e integrales para garantizar la calidad del código.

## Ejecutar Todas las Pruebas
bash
Copy code
Esto ejecutará las pruebas definidas en los archivos con sufijo .test.tsx o .test.ts.
 ```bash
  npm test
