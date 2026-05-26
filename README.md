# Laboratorio 06 - DevOps Moderno con GitHub Actions y Azure DevOps

## Descripción del proyecto

Este repositorio corresponde al Laboratorio 06 de Sistemas Operativos. El objetivo principal fue implementar un flujo DevOps completo, integrando desarrollo, pruebas automáticas, Docker, artifacts, GitHub Actions, Azure DevOps y despliegue en una máquina virtual Ubuntu en Azure.

La idea no fue solamente crear una aplicación simple, sino armar un proceso más parecido a un escenario real. Primero se desarrolló una aplicación web con una API mínima, después se validó con pruebas automáticas, se empaquetó como artifact y finalmente se desplegó automáticamente en una VM usando SSH y Docker Compose.

---

## Objetivos del laboratorio

Los objetivos principales fueron:

- Crear una aplicación base para probar un flujo DevOps.
- Implementar una API mínima con endpoints de validación.
- Ejecutar pruebas automáticas.
- Usar Docker para empaquetar y ejecutar la aplicación.
- Configurar un workflow de CI en GitHub Actions.
- Generar y publicar un artifact.
- Crear una VM Ubuntu en Azure.
- Configurar SSH, puertos y Docker en la VM.
- Crear un workflow de CD para desplegar automáticamente.
- Usar secrets para proteger datos sensibles.
- Comparar GitHub Actions con Azure DevOps Pipelines.

---

## Tecnologías utilizadas

- Git y GitHub
- GitHub Actions
- Azure DevOps Pipelines
- Azure Virtual Machines
- Ubuntu Server 24.04 LTS
- Node.js
- Express
- Jest
- Supertest
- Docker
- Docker Compose
- SSH
- YAML
- PowerShell
- Bash

---

## Estructura del repositorio

```text
Lab06-DevOps-Facundo/
│
├── app/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── test/
│       └── app.test.js
│
├── web/
│   ├── index.html
│   └── styles.css
│
├── scripts/
│   ├── deploy.sh
│   └── healthcheck.sh
│
├── docs/
│   ├── pre-lab.md
│   └── post-lab.md
│
├── pipeline/
│   └── azure-pipelines-ci.yml
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── docker-compose.yml
├── .dockerignore
├── .gitattributes
├── .gitignore
├── INFORME.md
└── README.md
```

---

## Aplicación desarrollada

La aplicación tiene dos partes principales.

Por un lado, se creó una página web estática con el mensaje principal "Hola Mundo DevOps". Esta página sirve como interfaz visual para mostrar que la aplicación está funcionando.

Por otro lado, se creó una API con Node.js y Express. Esta API incluye endpoints simples que permiten validar el estado del servicio.

Endpoints principales:

| Endpoint | Función |
|---|---|
| `/` | Muestra la página web principal |
| `/api` | Devuelve un mensaje de la API |
| `/health` | Permite verificar si el servicio está activo |
| `/version` | Muestra la versión de la aplicación |

---

## Ejecución local

Para ejecutar la aplicación localmente, primero se entra a la carpeta de la app:

```powershell
cd app
```

Luego se instalan las dependencias:

```powershell
npm.cmd install
```

Se ejecutan las pruebas:

```powershell
npm.cmd test
```

Y finalmente se inicia la aplicación:

```powershell
npm.cmd start
```

La aplicación queda disponible en:

```text
http://localhost:3000
```

Endpoint de salud:

```text
http://localhost:3000/health
```

---

## Ejecución con Docker

También se puede ejecutar la aplicación usando Docker Compose desde la raíz del repositorio:

```powershell
docker compose build
```

Luego:

```powershell
docker compose up -d
```

La aplicación queda disponible en:

```text
http://localhost:8080
```

Para verificar los contenedores:

```powershell
docker ps
```

Para detener la aplicación:

```powershell
docker compose down
```

---

## Integración continua con GitHub Actions

Se configuró un workflow de CI en GitHub Actions. Este workflow se ejecuta automáticamente cuando se realiza un push o un pull request hacia la rama main.

El CI realiza los siguientes pasos:

1. Descarga el código del repositorio.
2. Configura Node.js.
3. Instala dependencias.
4. Valida la sintaxis de la aplicación.
5. Ejecuta pruebas automáticas.
6. Construye la imagen Docker.
7. Genera un artifact.
8. Publica el artifact dentro de GitHub Actions.

Archivo utilizado:

```text
.github/workflows/ci.yml
```

---

## Despliegue continuo hacia Azure

También se configuró un workflow de CD. Este workflow se ejecuta después de que el CI finaliza correctamente.

El CD realiza los siguientes pasos:

1. Descarga el artifact generado por el CI.
2. Prepara la clave SSH usando GitHub Secrets.
3. Copia el artifact a la VM Ubuntu en Azure.
4. Extrae los archivos en `/opt/lab06-devops`.
5. Ejecuta el script de despliegue.
6. Levanta la aplicación con Docker Compose.
7. Verifica el endpoint público `/health`.

Archivo utilizado:

```text
.github/workflows/cd.yml
```

---

## VM en Azure

Para el despliegue se utilizó una máquina virtual Ubuntu en Azure.

Configuración general:

| Elemento | Configuración |
|---|---|
| Sistema operativo | Ubuntu Server 24.04 LTS |
| Acceso | SSH |
| Puerto SSH | 22 |
| Puerto HTTP | 80 |
| Puerto de la app | 8080 |
| Carpeta de despliegue | `/opt/lab06-devops` |

La aplicación publicada queda disponible por el puerto 8080.

URL pública usada durante el laboratorio:

```text
http://TU_IP_PUBLICA:8080
```

Endpoint de salud:

```text
http://TU_IP_PUBLICA:8080/health
```

---

## Secrets utilizados

Para no exponer datos sensibles en el repositorio, se usaron GitHub Secrets.

Secrets configurados:

| Secret | Uso |
|---|---|
| `AZURE_VM_HOST` | IP pública de la VM |
| `AZURE_VM_USER` | Usuario SSH |
| `AZURE_VM_SSH_KEY` | Clave privada SSH |
| `APP_PORT` | Puerto público de la aplicación |

---

## Azure DevOps Pipeline comparativo

Además de GitHub Actions, se agregó un pipeline comparativo para Azure DevOps.

Este pipeline realiza:

- Instalación de dependencias.
- Validación de sintaxis.
- Ejecución de pruebas.
- Construcción de imagen Docker.
- Creación de artifact.
- Publicación del artifact.

Archivo utilizado:

```text
pipeline/azure-pipelines-ci.yml
```

Este flujo permitió comparar GitHub Actions con Azure DevOps Pipelines. En este laboratorio, GitHub Actions resultó más directo porque el código ya estaba alojado en GitHub, mientras que Azure DevOps permitió observar una alternativa más orientada a entornos empresariales.

---

## Scripts incluidos

El repositorio incluye scripts para automatizar tareas del despliegue.

| Script | Función |
|---|---|
| `scripts/deploy.sh` | Detiene contenedores anteriores y levanta la aplicación con Docker Compose |
| `scripts/healthcheck.sh` | Verifica que el endpoint `/health` responda correctamente |

---

## Problemas encontrados

Durante el desarrollo aparecieron algunos problemas reales:

- PowerShell bloqueó la ejecución de `npm` por políticas de scripts.
- Se solucionó usando `npm.cmd`.
- El archivo `package.json` tuvo un problema de codificación BOM.
- Docker Desktop no estaba iniciado al momento de construir la imagen.
- Se confundieron comandos de PowerShell con comandos de Bash dentro de la VM.
- El CD falló inicialmente al descargar el artifact porque faltaba contexto del repositorio Git.
- Se corrigió agregando `actions/checkout@v4` al workflow de CD.

Estos errores ayudaron a entender mejor la diferencia entre el entorno local, GitHub Actions y la VM Ubuntu en Azure.

---

## Resultado final

El resultado final fue una aplicación web con API mínima, validada automáticamente, empaquetada como artifact y desplegada en una VM Ubuntu de Azure mediante un workflow de CD.

Flujo final:

```text
Código en GitHub → CI → Pruebas → Docker build → Artifact → CD → SSH → Azure VM → Docker Compose → Aplicación pública
```

---

## Conclusión

Este laboratorio permitió practicar un flujo DevOps completo. No se trató solamente de crear una aplicación, sino de automatizar el proceso desde el código hasta el despliegue final.

El uso de GitHub Actions, Docker, SSH, Azure y secrets permitió construir un flujo más ordenado, seguro y repetible. Además, la comparación con Azure DevOps ayudó a ver que distintas plataformas pueden resolver problemas parecidos, aunque con interfaces y formas de configuración diferentes.