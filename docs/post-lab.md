# Post-Lab - Laboratorio 06

## Reflexión posterior al desarrollo del laboratorio

Después de realizar el laboratorio, se puede ver que DevOps no es solamente usar una herramienta o crear un archivo YAML. En realidad, el laboratorio muestra cómo se conectan varias partes de un proyecto: el código, las pruebas, el empaquetado, los artifacts, los secretos, la conexión SSH, Docker y el despliegue en una máquina virtual.

Al principio, la aplicación funcionaba solamente de forma local. Después se fue mejorando el flujo hasta lograr que GitHub Actions pudiera validar el código automáticamente, generar un artifact y desplegar la aplicación en una VM Ubuntu de Azure. Esto hace que el proceso sea más ordenado y mucho menos manual.

---

## 1. Diferencia práctica entre CI y CD

En la práctica, la diferencia entre CI y CD se entendió mejor al separarlo en dos workflows.

El workflow de CI se encargó de validar que el código estuviera correcto. Para eso instaló dependencias, ejecutó una validación de sintaxis, corrió pruebas automáticas, construyó la imagen Docker y generó un artifact.

El workflow de CD fue un paso más allá. No se quedó solamente en comprobar que la aplicación funcionara, sino que tomó el artifact generado por CI y lo desplegó automáticamente en la VM Ubuntu de Azure.

Por eso, en este laboratorio CI fue la parte de validación, mientras que CD fue la parte de publicación.

---

## 2. ¿Qué ventajas tuvo usar GitHub Actions?

GitHub Actions fue útil porque está integrado directamente con el repositorio. Cada vez que se hizo un push a la rama main, el workflow se ejecutó automáticamente.

También permitió ver claramente los logs de cada paso. Esto fue importante porque cuando algo fallaba, se podía identificar si el problema estaba en la instalación de dependencias, en las pruebas, en Docker, en la descarga del artifact o en la conexión SSH.

Otra ventaja fue el uso de secrets. Gracias a eso, datos sensibles como la IP de la VM, el usuario SSH y la clave privada no quedaron escritos dentro del código.

---

## 3. ¿Qué ventajas tuvo usar Azure DevOps?

Azure DevOps permitió comparar otra plataforma de CI/CD. Aunque el flujo principal del laboratorio se hizo con GitHub Actions, Azure DevOps sirvió para ver que la lógica de un pipeline es parecida: se define un YAML, se elige un agente, se ejecutan pasos y se publican resultados.

La diferencia es que Azure DevOps se siente más orientado a un entorno empresarial, con más secciones y herramientas integradas. GitHub Actions resultó más directo para este caso porque el código ya estaba en GitHub.

---

## 4. Importancia de los artifacts

El artifact fue importante porque permitió separar la etapa de construcción de la etapa de despliegue.

En vez de que el CD tomara archivos sueltos sin control, se usó un paquete generado previamente por el CI. Esto hace que el despliegue sea más confiable, porque se publica exactamente lo que ya pasó por pruebas y validaciones.

En este laboratorio, el artifact incluyó la aplicación, la web estática, los scripts, el docker-compose y la documentación necesaria.

---

## 5. Importancia de los secrets

Los secrets fueron necesarios para no exponer información sensible. Si la clave privada SSH o la IP del servidor se escribieran directamente en el archivo YAML, quedarían visibles en el repositorio.

Al usar GitHub Secrets, el workflow pudo conectarse a la VM sin mostrar esos datos en el código. Esto es una buena práctica importante en cualquier flujo DevOps real.

---

## 6. Problemas encontrados y soluciones

Durante el laboratorio aparecieron varios errores que ayudaron a entender mejor el funcionamiento del entorno.

Uno de los primeros problemas fue que PowerShell no permitía ejecutar `npm` porque la política de ejecución de scripts estaba bloqueada. La solución fue usar `npm.cmd`, que permite ejecutar npm sin depender del archivo `npm.ps1`.

También apareció un error en `package.json` por un carácter BOM al inicio del archivo. Esto hacía que Jest no pudiera leer correctamente el JSON. Se solucionó reescribiendo el archivo en UTF-8 sin BOM.

Otro problema ocurrió al intentar construir la imagen Docker. El error indicaba que Docker no podía conectarse con el daemon. Esto pasó porque Docker Desktop no estaba iniciado. La solución fue abrir Docker Desktop, esperar a que el motor estuviera activo y volver a ejecutar `docker compose build`.

También hubo una confusión entre comandos de PowerShell y comandos de Bash. Algunos comandos pensados para Windows se pegaron dentro de la VM Ubuntu. Esto permitió diferenciar mejor qué comandos se ejecutan en el entorno local y cuáles dentro del servidor Linux.

Finalmente, en el workflow de CD apareció un error al descargar el artifact porque el job no tenía contexto del repositorio Git. Se corrigió agregando el paso `actions/checkout@v4` y especificando el repositorio al usar `gh run download`.

---

## 7. Resultado final

El resultado final fue una aplicación web con una API mínima desplegada en una VM Ubuntu de Azure. La aplicación quedó disponible públicamente por el puerto 8080 y el endpoint `/health` permitió verificar que el servicio estaba funcionando correctamente.

El flujo final quedó de la siguiente forma:

Código en GitHub → GitHub Actions CI → Pruebas → Docker build → Artifact → GitHub Actions CD → SSH → VM Ubuntu en Azure → Docker Compose → Aplicación pública

---

## 8. Conclusión personal

Este laboratorio fue más completo que simplemente subir una página a un servidor. Lo más importante fue entender cómo se conectan las distintas etapas del proceso y cómo una aplicación puede pasar de estar en una computadora local a quedar publicada automáticamente en una VM.

También quedó claro que DevOps no elimina los errores, pero sí ayuda a encontrarlos y corregirlos de forma más ordenada. Cada fallo dejó un registro en los logs, y eso hizo más fácil entender qué estaba pasando.

En conclusión, el laboratorio permitió practicar un flujo bastante cercano a un caso real: desarrollo, pruebas, empaquetado, despliegue, uso de secrets, conexión SSH, Docker y publicación en Azure.