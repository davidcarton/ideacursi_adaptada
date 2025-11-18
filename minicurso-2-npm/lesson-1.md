# 🧠 Cómo estudiar esta lección si te cuesta mantener la atención

1. **Lee en bloques cortos**, una sección cada vez.  
2. **Prueba todo en tu terminal inmediatamente**.  
3. **Evita memorizar**: la comprensión viene al repetir.  
4. **No avances si algo no quedó claro**, vuelve una sección atrás.  
5. **Haz pausas pequeñas** para evitar saturación.  
6. **Convierte cada ejemplo en acción** escribiéndolo tú mismo.

---
# Lección 1: Introducción a NPM - El Gestor de Paquetes de Node.js

**Minicurso:** Pilar 2 - NPM (Yellow - Overcoming Greed)  
**Nivel:** Beginner  
**Duración estimada:** 50 minutos  
**Filosofía Estoica:** Superar la codicia mediante la colaboración sabia

---

## 🎯 Objetivos de Aprendizaje

Al completar esta lección, serás capaz de:

- Comprender qué es NPM y su rol en el ecosistema de Node.js
- Diferenciar entre dependencias, devDependencies y peerDependencies
- Instalar paquetes globalmente y localmente
- Interpretar y gestionar el archivo `package.json`
- Aplicar versionado semántico (SemVer) en tus proyectos
- Reconocer la virtud estoica de la colaboración sobre la posesión

---

## 📖 Introducción: La Paradoja de la Codicia en Desarrollo

### ¿Qué es NPM?

**NPM** significa **Node Package Manager**. Es el gestor de paquetes predeterminado para Node.js y el registro de software más grande del mundo, con más de 2 millones de paquetes publicados. NPM te permite:

- **Instalar** paquetes de terceros creados por la comunidad
- **Compartir** tu propio código con otros desarrolladores
- **Gestionar** versiones y dependencias de forma automática
- **Ejecutar** scripts personalizados para tu proyecto

### La Codicia del Desarrollador

Existe una tentación natural en todo programador: **construirlo todo desde cero**. Esta codicia intelectual se manifiesta como:

- "Si lo escribo yo, lo entenderé mejor"
- "No confío en código de otros"
- "Necesito control total sobre cada línea"
- "Mi implementación será mejor"

Los estoicos antiguos advertían contra este tipo de codicia. Séneca escribió: *"Aquel que codicia lo que otro posee, pierde lo que tiene"*. En programación, quien se niega a usar código de otros pierde:

- **Tiempo** que podría dedicar a problemas únicos
- **Calidad** de implementaciones probadas por millones
- **Seguridad** de código auditado por la comunidad
- **Velocidad** de desarrollo y time-to-market

NPM es la herramienta que nos libera de esta codicia. No necesitas poseer todo el código; solo necesitas saber **usarlo sabiamente**.

---

## 🚀 Primeros Pasos con NPM

### Verificando la Instalación

NPM se instala automáticamente con Node.js. Verifica tu versión:

```bash
npm --version
# Ejemplo de salida: 9.8.1

node --version
# Ejemplo de salida: v18.17.0
```

Si necesitas actualizar NPM:

```bash
npm install -g npm@latest
```

### El Archivo package.json - El Corazón de tu Proyecto

El archivo `package.json` es el manifiesto de tu proyecto Node.js. Contiene metadata y configuración esencial. Para crear uno interactivamente:

```bash
npm init
```

NPM te hará preguntas sobre tu proyecto:

```
package name: (mi-proyecto) 
version: (1.0.0) 
description: Mi primer proyecto Node.js
entry point: (index.js) 
test command: 
git repository: 
keywords: nodejs, learning
author: Tu Nombre
license: (ISC) MIT
```

Alternativamente, genera uno con valores predeterminados:

```bash
npm init -y
```

Esto crea un `package.json` básico:

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Anatomía del package.json

Analicemos cada campo importante:

```json
{
  "name": "mi-proyecto",           // Nombre único del paquete
  "version": "1.0.0",               // Versión semántica
  "description": "Descripción",     // Breve descripción del proyecto
  "main": "index.js",               // Punto de entrada cuando se require()
  "scripts": {                      // Scripts ejecutables
    "start": "node index.js",
    "test": "jest",
    "dev": "nodemon index.js"
  },
  "keywords": ["nodejs", "api"],    // Palabras clave para búsqueda
  "author": "Tu Nombre",            // Autor o autores
  "license": "MIT",                 // Licencia del código
  "dependencies": {                 // Dependencias de producción
    "express": "^4.18.2"
  },
  "devDependencies": {             // Dependencias solo para desarrollo
    "jest": "^29.5.0",
    "nodemon": "^2.0.22"
  }
}
```

---

## 📦 Instalando Paquetes

### Instalación Local vs Global

**Local (por proyecto)** - El patrón más común:
```bash
npm install express
# o abreviado:
npm i express
```

Esto:
1. Descarga el paquete a `node_modules/`
2. Añade la entrada a `dependencies` en `package.json`
3. Crea o actualiza `package-lock.json` con versiones exactas

**Global (disponible en todo el sistema)**:
```bash
npm install -g nodemon
```

Úsalo para herramientas CLI que necesitas en múltiples proyectos (nodemon, eslint, typescript, etc.).

⚠️ **Regla general**: Instala local por defecto. Solo instala global para herramientas de línea de comandos que usas frecuentemente.

### Tipos de Dependencias

#### dependencies
Paquetes necesarios para que tu aplicación funcione en producción:

```bash
npm install express
npm install mongoose
npm install dotenv
```

En `package.json`:
```json
"dependencies": {
  "express": "^4.18.2",
  "mongoose": "^7.3.1",
  "dotenv": "^16.3.1"
}
```

#### devDependencies
Paquetes solo necesarios durante desarrollo (testing, linting, build tools):

```bash
npm install --save-dev jest
npm install -D eslint
npm install -D nodemon
```

En `package.json`:
```json
"devDependencies": {
  "jest": "^29.5.0",
  "eslint": "^8.44.0",
  "nodemon": "^2.0.22"
}
```

Cuando despliegas a producción, puedes omitir devDependencies:
```bash
npm install --production
```

#### peerDependencies
Declara que tu paquete requiere que el usuario tenga instalada otra dependencia (común en plugins):

```json
"peerDependencies": {
  "react": "^18.0.0"
}
```

NPM mostrará advertencias si el proyecto host no tiene la versión correcta de React instalada.

---

## 🔢 Versionado Semántico (SemVer)

NPM usa **Semantic Versioning** para gestionar versiones: `MAJOR.MINOR.PATCH`

### Formato: X.Y.Z

```
  1  .  4  .  7
  ↑     ↑     ↑
MAJOR MINOR PATCH
```

- **MAJOR** (1): Cambios incompatibles con versiones anteriores (breaking changes)
- **MINOR** (4): Nueva funcionalidad compatible con versiones anteriores
- **PATCH** (7): Bug fixes compatibles con versiones anteriores

### Operadores de Rango

NPM permite especificar rangos de versiones aceptables:

```json
{
  "dependencies": {
    "express": "4.18.2",      // Versión exacta
    "lodash": "^4.17.21",     // Compatible con 4.x.x (< 5.0.0)
    "axios": "~1.4.0",        // Compatible con 1.4.x (< 1.5.0)
    "morgan": "*",            // Cualquier versión (NO RECOMENDADO)
    "cors": ">=2.8.0 <3.0.0"  // Rango personalizado
  }
}
```

**Operadores explicados**:

- **Caret `^`** (más común): Permite cambios que no modifican el dígito más a la izquierda diferente de cero
  - `^1.2.3` → acepta `1.2.4`, `1.3.0`, pero NO `2.0.0`
  - `^0.2.3` → acepta `0.2.4`, pero NO `0.3.0` (en 0.x, minor es breaking)

- **Tilde `~`**: Permite cambios de PATCH únicamente
  - `~1.2.3` → acepta `1.2.4`, `1.2.5`, pero NO `1.3.0`

- **Sin operador**: Versión exacta
  - `1.2.3` → SOLO acepta `1.2.3`

**¿Cuál usar?**
- `^` (caret) para dependencias estables (recibe bug fixes y features)
- Sin operador para versiones críticas que no debes cambiar
- `~` cuando solo quieres bug fixes, no features

---

## 🔍 Comandos NPM Esenciales

### Instalación y Desinstalación

```bash
# Instalar todas las dependencias del package.json
npm install

# Instalar paquete específico
npm install express
npm install express@4.18.2        # Versión específica
npm install express@latest        # Última versión

# Desinstalar
npm uninstall express
npm uninstall -g nodemon          # Global
```

### Información de Paquetes

```bash
# Ver información del paquete
npm view express

# Ver todas las versiones disponibles
npm view express versions

# Ver qué dependencias están desactualizadas
npm outdated

# Ver árbol de dependencias
npm list
npm list --depth=0    # Solo nivel raíz
```

### Actualización

```bash
# Actualizar paquetes (respetando SemVer del package.json)
npm update

# Actualizar a última versión ignorando SemVer
npm install express@latest

# Verificar si hay actualizaciones de seguridad
npm audit
npm audit fix         # Intentar arreglar automáticamente
```

---

## 🧘 Reflexión Estoica: Colaboración sobre Posesión

### El Mito del Desarrollador Solitario

Existe un mito romántico del programador que escribe todo desde cero, dominando cada línea de código. Esta es una forma de codicia intelectual que los estoicos advertían era destructiva.

Epicteto enseñaba: *"Ningún hombre es libre si no es dueño de sí mismo"*. Pero también entendía que la independencia no significa aislamiento. En el contexto de NPM, esto se traduce en:

**Falsa independencia**: "No usaré librerías de otros porque necesito control total"  
**Verdadera independencia**: "Elegiré sabiamente qué librerías usar, entendiendo sus trade-offs, y las dominaré para mis propósitos"

### Virtudes del Desarrollador Estoico con NPM

1. **Discernimiento (Prudentia)**: No todo paquete es útil. Evalúa antes de instalar:
   - ¿Está bien mantenido?
   - ¿Tiene buena reputación?
   - ¿Es la solución más simple?
   - ¿Realmente lo necesitas?

2. **Gratitud**: Cada paquete representa horas de trabajo de otros desarrolladores. Al usarlo, honras su esfuerzo y contribuyes a un ecosistema de generosidad.

3. **Contribución (Virtus)**: No solo consumas. Cuando encuentres bugs, reporta issues. Si puedes, contribuye código. Devuelve al commons.

4. **Moderación**: Evita "npm install" compulsivo. El síndrome de "hay un paquete para eso" puede llevar a proyectos hinchados con 500 dependencias. Marco Aurelio: *"Muy poco es necesario para hacer una vida feliz"*.

### Ejercicio de Reflexión

Antes de instalar tu próximo paquete, pregúntate:

- ¿Puedo implementar esto en <50 líneas de código yo mismo?
- ¿Esta librería resuelve un problema complejo (crypto, parsing, networking)?
- ¿O solo ahorra unas pocas líneas de código simple?

Si es lo último, considera escribirlo tú mismo. Si es lo primero, usa la librería con gratitud.

---

## 📝 Ejercicios Prácticos

### Ejercicio 1: Crear tu Primer Proyecto NPM

```bash
# 1. Crear directorio
mkdir mi-primer-proyecto
cd mi-primer-proyecto

# 2. Inicializar npm
npm init -y

# 3. Instalar express
npm install express

# 4. Crear index.js
cat > index.js << 'EOF'
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
EOF

# 5. Añadir script start
# Edita package.json manualmente para añadir:
# "scripts": { "start": "node index.js" }

# 6. Ejecutar
npm start
```

Abre `http://localhost:3000` en tu navegador.

### Ejercicio 2: Explorar Dependencias

Instala `lodash` y explora su árbol de dependencias:

```bash
npm install lodash
npm list lodash
npm view lodash dependencies
```

Observa cómo lodash tiene 0 dependencias (es autocontenido). Esto es una señal de una librería bien diseñada.

### Ejercicio 3: Versionado SemVer

Crea un `package.json` con estas dependencias:

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "axios": "~1.4.0",
    "dotenv": "16.3.1"
  }
}
```

Luego ejecuta:
```bash
npm install
npm outdated
```

Pregúntate: ¿Qué versión exacta de cada paquete se instaló? ¿Por qué?

### Ejercicio 4: npm audit

Instala una versión antigua de express con vulnerabilidades conocidas:

```bash
npm install express@4.16.0
npm audit
```

Observa las vulnerabilidades detectadas. Luego:
```bash
npm audit fix
```

¿Qué versión de express se instaló? ¿Se resolvieron las vulnerabilidades?

---

## 🎯 Checklist de Dominio

Antes de pasar a la siguiente lección, asegúrate de:

- [ ] Poder crear un proyecto nuevo con `npm init`
- [ ] Entender la diferencia entre `dependencies` y `devDependencies`
- [ ] Instalar paquetes local y globalmente
- [ ] Interpretar versionado semántico (MAJOR.MINOR.PATCH)
- [ ] Explicar la diferencia entre `^`, `~` y versión exacta
- [ ] Usar comandos: `npm install`, `npm uninstall`, `npm update`, `npm audit`
- [ ] Ver información de paquetes con `npm view` y `npm list`
- [ ] Reflexionar sobre cuándo usar un paquete vs. escribir código propio

---

## 🔗 Recursos Adicionales

- [Documentación oficial de NPM](https://docs.npmjs.com/)
- [NPM Registry](https://www.npmjs.com/) - Busca paquetes
- [Semantic Versioning Spec](https://semver.org/)
- [Package.json Documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- Séneca: *Cartas a Lucilio*, Carta 2 (sobre la codicia)

---

## 🌟 Reflexión Final

Has dado tu primer paso en el ecosistema NPM. Aprendiste no solo cómo instalar paquetes, sino **por qué** es virtuoso hacerlo con discernimiento.

El desarrollador sabio entiende que:
- **La colaboración** supera al aislamiento
- **La comunidad** es más fuerte que el individuo
- **El código compartido** beneficia a todos

Pero también comprende que:
- No todo paquete merece estar en tu proyecto
- La simplicidad es virtud
- Entender las herramientas que usas es responsabilidad

Marco Aurelio escribió: *"Lo que no es bueno para la colmena no puede ser bueno para la abeja"*. NPM es la colmena del desarrollo Node.js. Al usar paquetes con sabiduría, al contribuir cuando puedas, al mantener tus dependencias actualizadas y seguras, **contribuyes al bien común**.

En la próxima lección, profundizaremos en `package-lock.json`, `node_modules`, y cómo gestionar proyectos con múltiples dependencias de forma profesional.

¡La codicia ha sido identificada. La colaboración te espera! 🌻

---

**Próxima lección**: Gestión Avanzada de Dependencias  
**Preparación recomendada**: Crea 3 proyectos pequeños con diferentes paquetes y explora sus dependencias con `npm list`
