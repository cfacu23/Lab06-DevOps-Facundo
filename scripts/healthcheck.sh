#!/usr/bin/env bash
set -euo pipefail

URL="${1:-http://localhost:8080/health}"

echo "Verificando estado de la aplicacion en: $URL"

for intento in {1..12}; do
  if curl -fsS "$URL"; then
    echo ""
    echo "Healthcheck correcto."
    exit 0
  fi

  echo "Intento $intento fallido. Reintentando en 5 segundos..."
  sleep 5
done

echo "La aplicacion no respondio correctamente al healthcheck."
exit 1