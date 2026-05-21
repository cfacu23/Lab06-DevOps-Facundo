const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || "1.0.0";

app.use(express.json());

// Publica la carpeta web como sitio principal.
app.use(express.static(path.join(__dirname, "../web")));

// Endpoint simple de la API.
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "API del Laboratorio 06 funcionando correctamente",
    project: "Lab06 DevOps",
  });
});

// Endpoint para validar que el servicio está activo.
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "lab06-devops",
    environment: process.env.NODE_ENV || "development",
    version: APP_VERSION,
    timestamp: new Date().toISOString(),
  });
});

// Endpoint para ver la versión desplegada.
app.get("/version", (req, res) => {
  res.status(200).json({
    version: APP_VERSION,
    name: "Lab06-DevOps-Facundo",
  });
});

// Respuesta para rutas que no existen.
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Aplicación Lab06 ejecutándose en http://localhost:${PORT}`);
  });
}

module.exports = app;
