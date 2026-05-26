# Informe - Laboratorio 06

## DevOps Moderno con GitHub Actions y Azure DevOps

**Curso:** Sistemas Operativos  
**Estudiante:** Facundo Rodríguez  
**Repositorio:** https://github.com/cfacu23/Lab06-DevOps-Facundo
**Fecha:** Mayo 2026  

---

# Índice

1. Introducción  
2. Objetivos del laboratorio  
3. Pre-Lab  
4. Preparación del repositorio  
5. Desarrollo de la aplicación base  
6. Pruebas locales  
7. Docker y Docker Compose  
8. Integración continua con GitHub Actions  
9. Preparación de la VM en Azure  
10. Despliegue continuo hacia Azure  
11. Azure DevOps como comparación  
12. Post-Lab  
13. Problemas encontrados y soluciones  
14. Resultado final  
15. Conclusión personal  
16. Evidencias utilizadas  

---

# 1. Introducción

En este laboratorio se trabajó sobre un flujo DevOps moderno, utilizando GitHub Actions, Azure DevOps, Docker y una máquina virtual Ubuntu en Azure.

La idea principal no fue solamente crear una aplicación y subirla a un servidor, sino entender cómo se puede automatizar el proceso completo desde que el código está en el repositorio hasta que queda publicado en una VM. Para eso se trabajó con integración continua, despliegue continuo, artifacts, secrets, conexión SSH, Docker Compose y validaciones automáticas.

El laboratorio se desarrolló de forma progresiva. Primero se preparó el repositorio, después se creó una aplicación base, se agregaron pruebas, se incorporó Docker, se configuró el CI, luego se creó la VM en Azure y finalmente se automatizó el despliegue mediante GitHub Actions.

---

# 2. Objetivos del laboratorio

Los objetivos principales fueron:

- Comprender qué es DevOps y cómo se aplica en un proyecto.
- Diferenciar CI y CD en un caso práctico.
- Crear una aplicación web simple con una API mínima.
- Agregar endpoints de validación como `/health` y `/version`.
- Ejecutar pruebas automáticas.
- Usar Docker para empaquetar y ejecutar la aplicación.
- Crear un pipeline de CI con GitHub Actions.
- Generar y publicar un artifact.
- Crear una máquina virtual Ubuntu en Azure.
- Configurar acceso SSH y reglas de entrada.
- Desplegar la aplicación automáticamente en la VM.
- Usar GitHub Secrets para proteger datos sensibles.
- Comparar GitHub Actions con Azure DevOps Pipelines.

---

# 3. Pre-Lab

Antes de comenzar con la parte práctica, se realizó una investigación previa sobre los conceptos necesarios para entender el laboratorio.

Se trabajaron temas como DevOps, CI, CD, automatización, pipelines, Infrastructure as Code, YAML, runners, workflows, artifacts, SSH, deployments y secrets.

La parte más importante del pre-lab fue entender que DevOps no es una herramienta específica, sino una forma de trabajar donde el desarrollo del software y la operación del servidor se conectan mejor. En vez de hacer todo manualmente, se busca que el proceso sea repetible, ordenado y automatizado.

También se estudió la diferencia entre CI y CD. En este laboratorio, CI se usó para validar el código, ejecutar pruebas, construir Docker y generar un artifact. CD se usó para tomar ese artifact y desplegarlo automáticamente en la VM Ubuntu de Azure.

**Evidencias relacionadas:** Figuras 1 a 7.

---

# 4. Preparación del repositorio

Primero se creó el repositorio `Lab06-DevOps-Facundo` en GitHub. Luego se clonó en la computadora local y se preparó una estructura inicial de carpetas para organizar el trabajo.

La estructura se pensó para separar cada parte del laboratorio:

- `app`: código de la API Node.js.
- `web`: página web estática.
- `scripts`: scripts de despliegue y healthcheck.
- `docs`: documentación del pre-lab y post-lab.
- `pipeline`: archivo comparativo de Azure DevOps.
- `.github/workflows`: workflows de GitHub Actions.
- `evidencias`: carpeta pensada para capturas.
- `INFORME.md`: informe final del laboratorio.

Esta organización ayudó a mantener el proyecto más prolijo y a separar claramente el código, la documentación, los pipelines y los scripts.

**Evidencias relacionadas:** Figuras 2 a 5.

---

# 5. Desarrollo de la aplicación base

Después de preparar el repositorio, se creó la aplicación base del laboratorio. La aplicación tuvo dos partes.

Por un lado, se hizo una página web estática con HTML y CSS. Esta página muestra el mensaje principal "Hola Mundo DevOps" y explica brevemente que la aplicación forma parte del laboratorio.

Por otro lado, se creó una API con Node.js y Express. La API permite probar que el servicio está funcionando correctamente.

Los endpoints principales fueron:

| Endpoint | Función |
|---|---|
| `/` | Muestra la página principal |
| `/api` | Devuelve un mensaje de la API |
| `/health` | Verifica que el servicio esté activo |
| `/version` | Muestra la versión de la aplicación |

El endpoint `/health` fue especialmente importante porque luego se usó en el pipeline de CD para verificar si el despliegue había quedado funcionando.

**Evidencias relacionadas:** Figuras 8 a 13.

---

# 6. Pruebas locales

Antes de automatizar el proceso, se probó la aplicación localmente.

Se instalaron las dependencias con npm, se ejecutaron pruebas automáticas y después se levantó la aplicación en `localhost`.

Las pruebas se realizaron con Jest y Supertest. Se validó que:

- `/health` respondiera correctamente.
- `/version` devolviera la información de versión.
- Una ruta inexistente devolviera error 404.

Esto fue importante porque permitió comprobar que la API funcionaba antes de pasar a Docker y a GitHub Actions.

La aplicación se probó localmente en:

```text
http://localhost:3000
```

También se verificó:

```text
http://localhost:3000/health
```

y:

```text
http://localhost:3000/version
```

**Evidencias relacionadas:** Figuras 9 a 12.

---

# 7. Docker y Docker Compose

Después de comprobar que la aplicación funcionaba localmente, se agregó Docker.

Se creó un `Dockerfile` para construir una imagen de la aplicación y un archivo `docker-compose.yml` para levantar el servicio de forma más simple.

El uso de Docker permitió ejecutar la aplicación en un entorno más controlado, sin depender directamente de la configuración local de la computadora. Además, fue útil para preparar el despliegue en Azure, porque la VM también iba a ejecutar la aplicación con Docker Compose.

La aplicación se levantó localmente con:

```powershell
docker compose build
docker compose up -d
```

Luego quedó disponible en:

```text
http://localhost:8080
```

También se comprobó el endpoint:

```text
http://localhost:8080/health
```

**Evidencias relacionadas:** Figuras 14 a 20.

---

# 8. Integración continua con GitHub Actions

La siguiente etapa fue configurar el workflow de CI en GitHub Actions.

El archivo utilizado fue:

```text
.github/workflows/ci.yml
```

Este workflow se ejecuta automáticamente cuando se realiza un push o un pull request hacia la rama `main`.

El CI realiza los siguientes pasos:

1. Descarga el código del repositorio.
2. Configura Node.js.
3. Instala las dependencias.
4. Valida la sintaxis de la aplicación.
5. Ejecuta las pruebas automáticas.
6. Construye la imagen Docker.
7. Genera un paquete de despliegue.
8. Publica el artifact.

El artifact generado fue importante porque permitió separar la etapa de validación de la etapa de despliegue. De esta forma, el CD no toma archivos sueltos sin control, sino un paquete generado por un pipeline exitoso.

**Evidencias relacionadas:** Figuras 21 a 25.

---

# 9. Preparación de la VM en Azure

Luego se creó una máquina virtual Ubuntu en Azure para publicar la aplicación.

La configuración general fue:

| Elemento | Configuración |
|---|---|
| Sistema operativo | Ubuntu Server 24.04 LTS |
| Acceso | SSH |
| Puerto SSH | 22 |
| Puerto HTTP | 80 |
| Puerto de la aplicación | 8080 |
| Carpeta de despliegue | `/opt/lab06-devops` |

También se generó una clave SSH. La clave pública se usó para crear la VM y la clave privada se guardó como secret en GitHub Actions.

Después de crear la VM, se configuraron las reglas de entrada para permitir:

- Puerto 22 para SSH.
- Puerto 80 para HTTP.
- Puerto 8080 para la aplicación.

Luego se instaló Docker y Docker Compose en Ubuntu, y se hizo una prueba con Nginx para confirmar que el puerto 8080 respondía desde internet.

**Evidencias relacionadas:** Figuras 26 a 36.

---

# 10. Despliegue continuo hacia Azure

Con la VM preparada, se configuró el workflow de CD.

El archivo utilizado fue:

```text
.github/workflows/cd.yml
```

Este workflow se ejecuta automáticamente cuando el workflow de CI termina correctamente.

El CD realiza los siguientes pasos:

1. Descarga el artifact generado por CI.
2. Prepara la clave SSH desde GitHub Secrets.
3. Copia el artifact a la VM mediante `scp`.
4. Se conecta por SSH a la VM.
5. Extrae los archivos en `/opt/lab06-devops`.
6. Ejecuta el script `deploy.sh`.
7. Levanta la aplicación con Docker Compose.
8. Verifica el endpoint público `/health`.

El flujo final quedó así:

```text
Código en GitHub → CI → Pruebas → Docker build → Artifact → CD → SSH → Azure VM → Docker Compose → Aplicación pública
```

La aplicación quedó disponible públicamente en:

```text
http://68.211.72.223:8080
```

Y el endpoint de validación en:

```text
http://68.211.72.223:8080/health
```

**Evidencias relacionadas:** Figuras 37 a 47.

---

# 11. Azure DevOps como comparación

Además del flujo principal con GitHub Actions, se agregó un pipeline comparativo en Azure DevOps.

El archivo utilizado fue:

```text
pipeline/azure-pipelines-ci.yml
```

Este pipeline realizó tareas similares al CI de GitHub Actions:

- Instalación de dependencias.
- Validación de sintaxis.
- Ejecución de pruebas automáticas.
- Construcción de Docker.
- Creación de artifact.
- Publicación de artifact.

La comparación permitió ver que ambas plataformas trabajan con una lógica parecida. En las dos se define un YAML, se usa un agente o runner, se ejecutan pasos y se publican resultados.

La diferencia principal fue que GitHub Actions resultó más directo para este laboratorio porque el código ya estaba en GitHub. Azure DevOps, en cambio, tiene una interfaz más orientada a proyectos empresariales y requiere configurar la conexión con GitHub.

**Evidencias relacionadas:** Figuras 48 a 54.

---

# 12. Post-Lab

En el post-lab se reflexionó sobre lo aprendido durante el desarrollo del laboratorio.

La conclusión principal fue que DevOps no es solamente crear un pipeline, sino conectar varias partes de un proyecto. El código, las pruebas, Docker, los artifacts, los secrets, SSH y Azure terminan formando un flujo completo.

También quedó más clara la diferencia práctica entre CI y CD. CI se encargó de validar que la aplicación estuviera bien, mientras que CD se encargó de publicar automáticamente esa aplicación en un servidor.

Además, los errores que aparecieron durante el proceso ayudaron a entender mejor cómo funcionan los entornos. No fue solamente seguir comandos, sino corregir problemas reales relacionados con PowerShell, Docker, GitHub Actions, Azure y Bash.

**Evidencias relacionadas:** Figuras 55 y 56.

---

# 13. Problemas encontrados y soluciones

Durante el laboratorio aparecieron varios problemas. En vez de borrarlos, se usaron como parte del aprendizaje y como evidencia del proceso.

## 13.1 Error con npm en PowerShell

Al intentar ejecutar `npm install`, PowerShell bloqueó la ejecución por la política de scripts de Windows.

La solución fue usar:

```powershell
npm.cmd install
```

y luego:

```powershell
npm.cmd test
```

Esto permitió ejecutar npm sin depender del archivo `npm.ps1`.

---

## 13.2 Error de codificación en package.json

También apareció un error en `package.json` causado por un carácter BOM al inicio del archivo. Esto hacía que Jest no pudiera interpretar correctamente el JSON.

La solución fue reescribir el archivo usando UTF-8 sin BOM.

Este error fue útil porque mostró que no solo importa el contenido del archivo, sino también su codificación.

---

## 13.3 Docker Desktop detenido

Al ejecutar `docker compose build`, apareció un error indicando que Docker no podía conectarse con el daemon.

Esto ocurrió porque Docker Desktop no estaba iniciado.

La solución fue abrir Docker Desktop, esperar a que el motor Linux estuviera activo y volver a ejecutar el build.

---

## 13.4 Confusión entre PowerShell y Bash

En una parte del laboratorio se intentaron ejecutar comandos de PowerShell dentro de la VM Ubuntu.

El error permitió diferenciar mejor los entornos:

- PowerShell se usó en Windows para crear archivos y trabajar con Git.
- Bash se usó dentro de Ubuntu para instalar paquetes, ejecutar Docker y administrar la VM.

La solución fue salir de la conexión SSH y volver a ejecutar los comandos desde el repositorio local en Windows.

---

## 13.5 Error en el workflow de CD

El primer intento del CD falló al descargar el artifact. El error indicaba que no era un repositorio Git.

Esto ocurrió porque el workflow de CD no había descargado el repositorio antes de usar `gh run download`.

La solución fue agregar:

```yaml
- name: Descargar codigo del repositorio
  uses: actions/checkout@v4
```

y especificar el repositorio en el comando de descarga del artifact.

Después de corregir eso, el CD pudo continuar con el proceso de despliegue.

---

# 14. Resultado final

El resultado final fue una aplicación web con API mínima, ejecutada con Docker Compose y desplegada automáticamente en una VM Ubuntu de Azure.

La aplicación quedó disponible públicamente por el puerto 8080.

Se logró implementar:

- Repositorio organizado.
- Pre-lab documentado.
- Aplicación web y API.
- Pruebas automáticas.
- Docker y Docker Compose.
- Workflow de CI.
- Artifact publicado.
- VM Ubuntu en Azure.
- Secrets en GitHub.
- Workflow de CD.
- Despliegue automático.
- Verificación con `/health`.
- Pipeline comparativo en Azure DevOps.
- Post-lab y README completo.

---

# 15. Conclusión personal

Este laboratorio fue más completo que simplemente subir una página a un servidor. Lo más importante fue entender el proceso completo y ver cómo cada parte se conecta con la siguiente.

Primero se creó el código, después se probó, se empaquetó, se convirtió en artifact y finalmente se desplegó en Azure. Todo eso se hizo con un flujo automático, lo que se parece mucho más a una forma real de trabajar.

También quedó claro que DevOps no significa que no haya errores. En realidad, los errores siguen apareciendo, pero el proceso ayuda a encontrarlos y corregirlos de forma más ordenada. Cada fallo dejó un registro, y eso permitió entender dónde estaba el problema.

En conclusión, el laboratorio permitió practicar un flujo DevOps bastante completo, usando herramientas reales como GitHub Actions, Azure, Docker, SSH, secrets y Azure DevOps.

---