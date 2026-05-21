# Pre-Lab - Laboratorio 06

## DevOps Moderno con GitHub Actions y Azure DevOps

En este pre-lab se realiza una investigación previa sobre los conceptos principales que se van a usar durante el laboratorio. La idea no es solamente definir palabras, sino entender cómo se conectan entre sí dentro de un flujo real de trabajo.

El laboratorio trata sobre DevOps, integración continua, entrega continua, automatización y despliegue de una aplicación en una máquina virtual Ubuntu en Azure. Por eso, antes de empezar con la parte práctica, es importante entender qué función cumple cada herramienta y por qué se usan estos procesos en proyectos reales.

---

# Parte 1 - Introducción a DevOps

## 1. ¿Qué es DevOps?

DevOps es una forma moderna de trabajar en proyectos de software que busca unir dos partes que antes solían estar bastante separadas: el desarrollo de la aplicación y la operación o administración del servidor donde esa aplicación se ejecuta.

En un proceso tradicional, una persona o equipo programaba la aplicación y después otra persona se encargaba de subirla al servidor, configurarla y hacerla funcionar. El problema de esa forma de trabajo es que muchas veces había errores al pasar de una etapa a otra. Por ejemplo, algo podía funcionar en la computadora del programador, pero fallar en el servidor porque faltaba una dependencia, porque el puerto estaba mal configurado o porque se había copiado mal algún archivo.

DevOps intenta solucionar ese problema haciendo que todo el proceso sea más ordenado, automático y controlado. En vez de depender solamente de pasos manuales, se usan herramientas que permiten validar el código, ejecutar pruebas, empaquetar la aplicación y desplegarla de una manera repetible.

Para mí, DevOps se puede entender como una forma de trabajar donde no alcanza con “hacer que el código funcione”, sino que también importa cómo se prueba, cómo se sube, cómo se mantiene y cómo se corrige si algo falla. Es una mentalidad más completa, porque conecta la programación con la infraestructura.

En este laboratorio, DevOps se va a aplicar usando GitHub, GitHub Actions, Azure DevOps, scripts, SSH, Docker básico y una máquina virtual Ubuntu en Azure.

---

## 2. Diferencia entre CI y CD

CI significa Integración Continua. Es el proceso donde cada cambio que se sube al repositorio se valida automáticamente. Por ejemplo, cuando se hace un `git push`, el sistema puede ejecutar un pipeline que instale dependencias, revise el código y corra pruebas.

Esto sirve para detectar errores rápido. En vez de esperar hasta el final del proyecto para darse cuenta de que algo está roto, la integración continua permite revisar cada cambio apenas se sube. Si el pipeline falla, ya sabemos que ese cambio tiene algún problema y se puede corregir antes de avanzar.

CD puede significar Entrega Continua o Despliegue Continuo. En este caso, el objetivo es que el código que ya fue validado pueda prepararse y publicarse automáticamente en un ambiente real o de prueba.

La diferencia principal es que CI se enfoca más en comprobar que el código esté bien, mientras que CD se enfoca en llevar ese código validado a un servidor o ambiente donde se pueda usar.

Una forma simple de verlo sería:

- CI responde a la pregunta: “¿El código funciona y pasa las pruebas?”
- CD responde a la pregunta: “¿Puedo publicar este código automáticamente en un servidor?”

En este laboratorio se usan las dos ideas. Primero se valida la aplicación con un pipeline de CI y después se automatiza el despliegue hacia una VM Ubuntu en Azure.

---

## 3. Beneficios de la automatización

La automatización es una de las partes más importantes de DevOps. Automatizar significa hacer que tareas repetitivas se ejecuten solas siguiendo pasos definidos previamente.

En un despliegue manual, la persona tiene que conectarse al servidor, copiar archivos, instalar dependencias, reiniciar servicios y comprobar si la aplicación quedó funcionando. Aunque esos pasos parezcan simples, pueden fallar por muchas razones: olvidarse un comando, copiar una carpeta equivocada, usar una versión distinta o reiniciar el servicio incorrecto.

Con automatización, esos pasos quedan escritos en archivos de configuración o scripts. Eso permite que el proceso se repita siempre de la misma forma.

Los beneficios principales son:

- Se reducen errores humanos.
- Se gana tiempo porque no hay que repetir todo manualmente.
- El proceso queda documentado en el propio repositorio.
- Es más fácil detectar en qué paso ocurrió un error.
- Se puede trabajar de forma más ordenada en equipo.
- El despliegue se vuelve más confiable.
- Se puede repetir el mismo proceso en otro servidor o ambiente.

En el contexto de este laboratorio, la automatización es importante porque el objetivo no es solamente crear una aplicación, sino lograr que esa aplicación pase por un flujo completo: código, pruebas, empaquetado, artifact y despliegue.

---

## 4. ¿Qué es un pipeline?

Un pipeline es una secuencia de pasos automatizados que se ejecutan sobre un proyecto. Normalmente se activa cuando ocurre una acción, como hacer un push al repositorio o abrir un pull request.

Un pipeline puede tener varias etapas. Por ejemplo:

Código → Instalación de dependencias → Pruebas → Empaquetado → Artifact → Deploy

Cada una de esas etapas cumple una función. Primero se obtiene el código, luego se prepara el ambiente, después se ejecutan pruebas, se genera un paquete y finalmente se puede desplegar la aplicación.

Lo importante de un pipeline es que permite transformar un proceso manual en un flujo ordenado. En vez de hacer todo a mano, el pipeline ejecuta los pasos definidos en un archivo YAML.

En este laboratorio, el pipeline va a servir para validar la aplicación, ejecutar pruebas básicas, generar un artifact y preparar el despliegue hacia la VM Ubuntu.

---

## 5. ¿Qué es Infrastructure as Code?

Infrastructure as Code, o IaC, significa administrar infraestructura usando archivos de configuración o código, en vez de hacerlo todo manualmente desde una interfaz gráfica.

Por ejemplo, en lugar de crear una máquina virtual, configurar redes, abrir puertos y definir servicios todo a mano, se pueden usar archivos que describan cómo debe quedar esa infraestructura. Herramientas como Terraform, Ansible o archivos YAML permiten acercarse a esa idea.

La ventaja de IaC es que la infraestructura queda documentada y se puede volver a crear de forma más fácil. Además, si otra persona necesita entender cómo está armado el entorno, puede revisar los archivos en vez de depender solamente de capturas o explicaciones.

En este laboratorio no se va a implementar una infraestructura completa como código con Terraform, pero sí se aplica parte de esa idea. Por ejemplo, al usar scripts, archivos YAML y configuraciones versionadas, el proceso queda más automatizado y menos dependiente de pasos manuales.

---

## 6. ¿Qué es un despliegue automatizado?

Un despliegue automatizado es el proceso de publicar una aplicación en un servidor sin tener que hacer todos los pasos manualmente cada vez.

En un despliegue manual, normalmente habría que conectarse por SSH al servidor, copiar archivos, instalar dependencias, reiniciar el servicio y revisar si funciona. En cambio, con un despliegue automatizado, esos pasos se definen en un pipeline o script.

En este laboratorio, el despliegue automatizado se va a realizar desde GitHub Actions hacia una VM Ubuntu en Azure. La idea es que, después de validar el código, el pipeline pueda conectarse al servidor, copiar o actualizar los archivos necesarios, ejecutar el script de deploy y verificar que la aplicación responda correctamente.

Esto se parece más a un escenario real, porque en empresas no conviene depender de que una persona recuerde todos los pasos cada vez que hay que actualizar una aplicación.

---

# Parte 2 - Investigación de plataformas

## Comparación de plataformas DevOps

| Plataforma | Características principales | Comentario personal |
|---|---|---|
| GitHub Actions | Permite crear workflows de CI/CD dentro de GitHub. Se configura con archivos YAML dentro de `.github/workflows`. | Me parece la opción más directa para este laboratorio porque el repositorio ya está en GitHub y queda todo integrado en un solo lugar. |
| Azure DevOps Pipelines | Permite crear pipelines de build, test y deploy. Está más orientado a entornos empresariales y se integra muy bien con Azure. | Es una buena opción para comparar, sobre todo porque el despliegue final del laboratorio se hace en Azure. |
| GitLab CI/CD | Incluye repositorio, issues, pipelines y herramientas DevOps dentro de GitLab. | Es una alternativa completa, aunque en este caso no la usaría porque el flujo principal del laboratorio está pensado con GitHub o Azure DevOps. |
| Bitbucket Pipelines | Se integra con Bitbucket y con herramientas del ecosistema Atlassian, como Jira o Trello. | Puede ser útil para equipos que ya trabajan con Atlassian, pero para este laboratorio no es la opción principal. |

Para este laboratorio se va a utilizar GitHub Actions como plataforma principal, porque permite crear el flujo CI/CD directamente desde el repositorio de GitHub. Además, se va a agregar Azure DevOps como comparación extra para ver diferencias en configuración, sintaxis y experiencia de uso.

---

# Parte 3 - Investigación técnica base

## 1. ¿Qué es YAML?

YAML es un formato de escritura que se usa mucho para archivos de configuración. A diferencia de otros formatos más cargados, YAML intenta ser fácil de leer para las personas.

En DevOps se usa bastante porque permite definir pasos, variables, jobs, triggers y configuraciones de una forma ordenada. Por ejemplo, en GitHub Actions los pipelines se escriben en archivos `.yml`.

Un archivo YAML puede indicar cosas como:

- Cuándo se ejecuta el pipeline.
- Qué sistema operativo usa el runner.
- Qué comandos se deben correr.
- Qué dependencias instalar.
- Qué archivos guardar como artifact.
- Qué pasos ejecutar para desplegar.

Hay que tener cuidado con la indentación, porque en YAML los espacios son importantes. Si un bloque queda mal alineado, el pipeline puede fallar aunque los comandos estén bien.

---

## 2. ¿Qué es un runner o agente?

Un runner o agente es la máquina que ejecuta los pasos de un pipeline.

Cuando se configura un workflow en GitHub Actions, ese workflow no se ejecuta mágicamente dentro del repositorio. Se ejecuta en una máquina preparada para correr los comandos. Esa máquina puede ser proporcionada por GitHub, por Azure DevOps o puede ser una máquina propia configurada como runner.

Por ejemplo, si el pipeline tiene que instalar NodeJS, correr `npm install` y ejecutar pruebas, todo eso ocurre dentro del runner.

En este laboratorio, GitHub Actions va a usar un runner para ejecutar los pasos del CI. Luego, para el CD, ese runner se conectará por SSH a la VM Ubuntu de Azure para desplegar la aplicación.

---

## 3. ¿Qué es un workflow?

Un workflow es una automatización definida dentro de un archivo YAML. En GitHub Actions, los workflows se guardan dentro de la carpeta `.github/workflows`.

Un workflow indica qué debe pasar cuando ocurre un evento. Por ejemplo, se puede configurar para que se ejecute cuando se hace un push a la rama `main` o cuando se abre un pull request.

Un workflow puede tener uno o varios jobs. Cada job puede tener diferentes steps. Por ejemplo:

- Descargar el código del repositorio.
- Instalar dependencias.
- Ejecutar pruebas.
- Crear un paquete.
- Subir un artifact.
- Ejecutar un despliegue.

En este laboratorio vamos a tener workflows separados para CI y CD. Esto ayuda a ordenar mejor el proceso: uno se encarga de validar y empaquetar, y el otro de desplegar.

---

## 4. ¿Qué es un artifact?

Un artifact es un archivo o paquete que se genera como resultado de un pipeline.

Por ejemplo, después de ejecutar pruebas y preparar la aplicación, el pipeline puede generar un archivo `.zip` o `.tar.gz` con todo lo necesario para desplegar. Ese paquete se guarda como artifact para poder descargarlo o usarlo en otra etapa del proceso.

El artifact es importante porque representa una versión concreta de la aplicación. En vez de copiar archivos sueltos sin control, se genera un paquete que salió de un pipeline exitoso.

En este laboratorio, el artifact va a servir para demostrar que el proceso no solo ejecuta pruebas, sino que también prepara la aplicación para el despliegue.

---

## 5. ¿Qué es SSH?

SSH es un protocolo que permite conectarse de forma segura a un servidor remoto. Se usa mucho para administrar servidores Linux.

En lugar de conectarse con una contraseña escrita directamente en el código, SSH permite usar un sistema de claves: una clave pública y una clave privada. La clave pública queda en el servidor y la clave privada se usa desde el cliente o desde el pipeline.

En este laboratorio, SSH es importante porque GitHub Actions necesita conectarse a la VM Ubuntu en Azure para ejecutar comandos de despliegue. Por ejemplo, copiar archivos, entrar a una carpeta, reiniciar contenedores o correr un script.

Usar SSH de forma correcta también mejora la seguridad, porque evita dejar contraseñas visibles dentro del repositorio.

---

## 6. ¿Qué es un deployment?

Un deployment es el proceso de publicar una aplicación en un ambiente donde pueda ser usada.

Ese ambiente puede ser una máquina virtual, un contenedor, un servidor web, una plataforma cloud o un ambiente de producción. En este laboratorio, el deployment final será hacia una VM Ubuntu en Azure.

El deployment no es solamente “subir archivos”. También puede incluir instalar dependencias, configurar servicios, reiniciar la aplicación, abrir puertos y verificar que todo funcione.

En este caso, el deployment va a estar automatizado para que el flujo sea más parecido a un escenario real de DevOps.

---

## 7. ¿Qué es un secreto o variable segura?

Un secreto o variable segura es un dato sensible que no debe quedar escrito directamente en el código del proyecto.

Algunos ejemplos de secretos son:

- La IP pública del servidor.
- El usuario SSH.
- La clave privada SSH.
- Tokens de acceso.
- Contraseñas.
- Variables de configuración privadas.

Si estos datos se escriben directamente en el repositorio, cualquier persona con acceso al código podría verlos. Por eso, plataformas como GitHub Actions permiten guardar secrets. El pipeline puede usar esos valores, pero no los muestra públicamente en los logs.

En este laboratorio, los secrets son necesarios para que el workflow pueda conectarse a la VM Ubuntu sin exponer información sensible dentro del repositorio.

---

# Decisión técnica para este laboratorio

Para realizar el laboratorio de forma completa, se decidió usar GitHub Actions como flujo principal de CI/CD y Azure DevOps como comparación extra.

La solución va a incluir:

- Un repositorio GitHub organizado.
- Una aplicación web estática con el mensaje "Hola Mundo DevOps".
- Una API mínima en NodeJS con un endpoint `/health`.
- Pruebas automáticas básicas.
- Docker básico como parte opcional.
- Empaquetado de la aplicación.
- Publicación de artifacts.
- Scripts de despliegue.
- Conexión por SSH a una VM Ubuntu en Azure.
- Despliegue automático.
- Validación final del servicio publicado.

La idea es no hacer solamente un ejemplo mínimo, sino un flujo más completo, pero sin salirnos de la consigna. Por eso se agregan los opcionales que tienen sentido para el laboratorio, como Docker básico, artifact y comparación con Azure DevOps, pero evitando tecnologías demasiado avanzadas que no son necesarias para esta práctica.

---

# Cierre del Pre-Lab

Después de investigar estos conceptos, se entiende mejor que el laboratorio no trata solamente de “subir una página a un servidor”. En realidad, el objetivo es construir un flujo completo donde el código pase por distintas etapas antes de quedar disponible públicamente.

El proceso esperado sería:

Código → Pipeline → Pruebas → Artifact → Deploy → Producción

Este enfoque permite trabajar de una forma más ordenada y profesional, ya que cada cambio queda validado, documentado y desplegado mediante un proceso automatizado.