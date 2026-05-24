#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/lab06-devops"

echo "Iniciando despliegue del Laboratorio 06..."
cd "$APP_DIR"

echo "Deteniendo contenedores anteriores si existen..."
docker compose down || true

echo "Construyendo y levantando la aplicacion..."
docker compose up -d --build

echo "Estado de los contenedores:"
docker compose ps

echo "Despliegue finalizado correctamente."