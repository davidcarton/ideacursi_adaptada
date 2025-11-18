# 🧠 Cómo estudiar esta lección si te cuesta mantener la atención

1. **Lee en bloques cortos**, una sección cada vez.  
2. **Prueba el código inmediatamente**.  
3. **No memorices**, entiende con ejemplos.  
4. **Pausa breve** si notas saturación.  
5. **Vuelve atrás sin miedo** si algo no está claro.

---
# Lección 2: Módulos File System y Path - Paciencia y Preparación

**Minicurso**: Módulos Integrados (Rojo - Superando el Orgullo)
**Lección**: 2 de 3
**Duración**: 35 minutos
**Tema Estoico**: Paciencia (operaciones asíncronas) y Preparación (manejo de errores)

---

## 🎯 Objetivos de Aprendizaje

Al final de esta lección, serás capaz de:

1. **Leer y escribir archivos** usando métodos tanto síncronos como asíncronos
2. **Manipular rutas de archivos** de forma segura en diferentes sistemas operativos
3. **Manejar errores del sistema de archivos** con gracia usando try-catch y callbacks
4. **Elegir apropiadamente** entre operaciones de archivos síncronas y asíncronas
5. **Trabajar con directorios**: crear, leer y eliminarlos
6. **Aplicar principios Estoicos** de paciencia y preparación a operaciones de archivos

---

## 📖 Introducción: El Arte de la Paciencia

### Por Qué Importa la Paciencia en Operaciones de Archivos

En el mundo físico, abrir un libro toma un momento. En Node.js, leer un archivo puede tomar milisegundos o segundos dependiendo del tamaño y velocidad del disco. El desarrollador orgulloso podría pensar:

> "Mi código debería ejecutarse instantáneamente. Esperar es ineficiente."

Pero el sabio Estoico sabe:

> *"Ninguna cosa grande se crea súbitamente, no más que un racimo de uvas o un higo. Si me dices que deseas un higo, te respondo que debe haber tiempo. Deja que primero florezca, luego dé fruto, luego madure."* — **Epicteto**

**Las operaciones de archivos asíncronas** encarnan esta paciencia. No bloquean tu programa mientras esperan el disco—dejan que otro trabajo suceda. Esto no es ineficiencia; es **eficiencia profunda**.

### Los Módulos Gemelos: fs y path

Estos módulos trabajan mano a mano:
- **fs (File System)**: Realiza las operaciones de archivos reales (leer, escribir, eliminar)
- **path**: Prepara las rutas correctamente para que fs no falle

Piensa en **path** como el cartógrafo y **fs** como el viajero. Buenos mapas previenen que el viajero se pierda.

---

## 📚 Contenido Central

### 1. El Módulo Path: Construyendo Rutas Seguras

#### Por Qué Importa path

**Problema**: Diferentes sistemas operativos usan diferentes separadores de ruta
- **Unix/Mac**: `/Users/developer/project/file.txt`
- **Windows**: `C:\Users\Developer\Project\file.txt`

**Solución**: El módulo `path` abstrae estas diferencias

#### Métodos Esenciales de path

```javascript
const path = require('path');

// 1. path.join() - Combinar segmentos de ruta de forma segura
const filePath = path.join('users', 'documents', 'report.txt');
console.log(filePath);
// Unix: users/documents/report.txt
// Windows: users\documents\report.txt

// 2. path.resolve() - Crear rutas absolutas
const absolutePath = path.resolve('data', 'config.json');
console.log(absolutePath);
// Unix: /Users/developer/myproject/data/config.json
// Windows: C:\Users\Developer\myproject\data\config.json

// 3. path.basename() - Extraer nombre de archivo
const filename = path.basename('/users/docs/report.pdf');
console.log(filename); // report.pdf

// 4. path.dirname() - Extraer ruta de directorio
const directory = path.dirname('/users/docs/report.pdf');
console.log(directory); // /users/docs

// 5. path.extname() - Extraer extensión de archivo
const extension = path.extname('report.pdf');
console.log(extension); // .pdf

// 6. path.parse() - Dividir ruta en componentes
const parsed = path.parse('/users/docs/report.pdf');
console.log(parsed);
/*
{
  root: '/',
  dir: '/users/docs',
  base: 'report.pdf',
  ext: '.pdf',
  name: 'report'
}
*/

// 7. path.normalize() - Limpiar rutas desordenadas
const messy = '/users//docs/../docs/./report.pdf';
const clean = path.normalize(messy);
console.log(clean); // /users/docs/report.pdf
```

#### Variables Especiales para Rutas

```javascript
// __dirname - Directorio del archivo actual
console.log(__dirname);
// Ejemplo: /Users/developer/myproject/src

// __filename - Ruta completa al archivo actual
console.log(__filename);
// Ejemplo: /Users/developer/myproject/src/app.js

// Combinar con path.join para rutas relativas
const configPath = path.join(__dirname, '..', 'config', 'database.json');
console.log(configPath);
// /Users/developer/myproject/config/database.json
```

#### Ejemplo Práctico: Rutas de Archivos Dinámicas

```javascript
const path = require('path');

// Función para construir ruta de archivo de log específica del usuario
function getUserLogPath(username) {
  // Empezar desde la raíz del proyecto
  const projectRoot = path.resolve(__dirname, '..');

  // Construir ruta: /project/logs/users/john_doe.log
  const logPath = path.join(
    projectRoot,
    'logs',
    'users',
    `${username}.log`
  );

  return path.normalize(logPath);
}

console.log(getUserLogPath('john_doe'));
// /Users/developer/myproject/logs/users/john_doe.log

// Esto funciona idénticamente en Windows:
// C:\Users\Developer\myproject\logs\users\john_doe.log
```

### 2. El Módulo File System: Lectura y Escritura

#### Operaciones Síncronas vs Asíncronas

**Síncrona (Bloqueante)**:
- El código espera hasta que la operación se complete
- Usar para: Archivos de configuración al inicio, scripts pequeños
- Los nombres de métodos terminan en `Sync`: `readFileSync()`, `writeFileSync()`

**Asíncrona (No bloqueante)**:
- El código continúa mientras la operación se ejecuta en segundo plano
- Usar para: Servidores web, archivos grandes, aplicaciones en producción
- Nombres de métodos: `readFile()`, `writeFile()`

#### Leyendo Archivos

**Método 1: Lectura Síncrona**

```javascript
const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, 'data.txt');
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('Contenido del archivo:', content);
} catch (error) {
  console.error('Error leyendo archivo:', error.message);
}
```

**Método 2: Lectura Asíncrona (Callback)**

```javascript
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');

fs.readFile(filePath, 'utf8', (error, content) => {
  if (error) {
    console.error('Error leyendo archivo:', error.message);
    return;
  }
  console.log('Contenido del archivo:', content);
});

console.log('¡Esto se ejecuta ANTES de que se lea el archivo!');
```

**Método 3: Lectura Asíncrona (Promesas)**

```javascript
const fs = require('fs').promises; // Usar API de promesas
const path = require('path');

async function readFileAsync() {
  try {
    const filePath = path.join(__dirname, 'data.txt');
    const content = await fs.readFile(filePath, 'utf8');
    console.log('Contenido del archivo:', content);
  } catch (error) {
    console.error('Error leyendo archivo:', error.message);
  }
}

readFileAsync();
```

**Comparación**:

| Método | Pros | Contras | Caso de Uso |
|--------|------|------|----------|
| **Sync** | Simple, código secuencial | Bloquea el programa | Scripts, configuración al inicio |
| **Callback** | No bloqueante, compatible con versiones antiguas | Callback hell | Código legacy |
| **Promises** | No bloqueante, async/await limpio | Requiere Node.js moderno | Aplicaciones modernas |

#### Escribiendo Archivos

**Escritura Síncrona**:
```javascript
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'output.txt');
const data = '¡Hola, Node.js!';

try {
  fs.writeFileSync(outputPath, data, 'utf8');
  console.log('Archivo escrito exitosamente');
} catch (error) {
  console.error('Error escribiendo archivo:', error.message);
}
```

**Escritura Asíncrona (Promesas)**:
```javascript
const fs = require('fs').promises;
const path = require('path');

async function writeFileAsync() {
  const outputPath = path.join(__dirname, 'output.txt');
  const data = '¡Hola, Node.js!';

  try {
    await fs.writeFile(outputPath, data, 'utf8');
    console.log('Archivo escrito exitosamente');
  } catch (error) {
    console.error('Error escribiendo archivo:', error.message);
  }
}

writeFileAsync();
```

**Añadiendo a Archivos**:
```javascript
const fs = require('fs').promises;

async function appendToLog(message) {
  const logPath = path.join(__dirname, 'app.log');
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  try {
    await fs.appendFile(logPath, logEntry, 'utf8');
    console.log('Entrada de log añadida');
  } catch (error) {
    console.error('Error añadiendo al log:', error.message);
  }
}

appendToLog('Aplicación iniciada');
appendToLog('Usuario inició sesión');
```

#### Codificación de Archivos

**Codificaciones Comunes**:
- `utf8`: Texto estándar (predeterminado para la mayoría de archivos de texto)
- `ascii`: Solo caracteres básicos en inglés
- `base64`: Datos binarios como texto
- `hex`: Datos binarios como hexadecimal

```javascript
// Leyendo archivos binarios (imágenes, PDFs)
const imageData = await fs.readFile('photo.jpg'); // Retorna Buffer
console.log(imageData.length); // Tamaño en bytes

// Leyendo archivos de texto
const textData = await fs.readFile('document.txt', 'utf8'); // Retorna string
console.log(textData.length); // Número de caracteres
```

### 3. Trabajando con Directorios

#### Creando Directorios

```javascript
const fs = require('fs').promises;
const path = require('path');

// Crear directorio único
async function createDirectory(dirName) {
  const dirPath = path.join(__dirname, dirName);

  try {
    await fs.mkdir(dirPath);
    console.log(`Directorio creado: ${dirPath}`);
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.log('El directorio ya existe');
    } else {
      console.error('Error creando directorio:', error.message);
    }
  }
}

createDirectory('uploads');

// Crear directorios anidados
async function createNestedDirectories(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Directorios creados: ${dirPath}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createNestedDirectories(path.join(__dirname, 'data', 'users', 'profiles'));
// Crea: data/ → data/users/ → data/users/profiles/
```

#### Leyendo Contenido de Directorios

```javascript
const fs = require('fs').promises;
const path = require('path');

async function listFiles(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);
    console.log('Archivos en el directorio:');
    files.forEach(file => console.log(`- ${file}`));
    return files;
  } catch (error) {
    console.error('Error leyendo directorio:', error.message);
  }
}

listFiles(__dirname);
```

#### Obteniendo Información de Archivos

```javascript
const fs = require('fs').promises;

async function getFileInfo(filePath) {
  try {
    const stats = await fs.stat(filePath);

    console.log('Información del Archivo:');
    console.log('- Tamaño:', stats.size, 'bytes');
    console.log('- Creado:', stats.birthtime);
    console.log('- Modificado:', stats.mtime);
    console.log('- Es Archivo:', stats.isFile());
    console.log('- Es Directorio:', stats.isDirectory());

    return stats;
  } catch (error) {
    console.error('Error obteniendo información del archivo:', error.message);
  }
}

getFileInfo(path.join(__dirname, 'data.txt'));
```

#### Eliminando Archivos y Directorios

```javascript
const fs = require('fs').promises;

// Eliminar archivo
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log('Archivo eliminado');
  } catch (error) {
    console.error('Error eliminando archivo:', error.message);
  }
}

// Eliminar directorio vacío
async function deleteDirectory(dirPath) {
  try {
    await fs.rmdir(dirPath);
    console.log('Directorio eliminado');
  } catch (error) {
    console.error('Error eliminando directorio:', error.message);
  }
}

// Eliminar directorio con contenido (recursivo)
async function deleteDirectoryRecursive(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
    console.log('Directorio y contenidos eliminados');
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### 4. Manejo de Errores: La Preparación Previene el Sufrimiento

#### Errores Comunes del Sistema de Archivos

```javascript
// ENOENT: Archivo o directorio no existe
// EACCES: Permiso denegado
// EEXIST: Archivo ya existe
// EISDIR: Operación esperaba archivo, encontró directorio
// ENOTDIR: Operación esperaba directorio, encontró archivo

async function safeReadFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    switch (error.code) {
      case 'ENOENT':
        console.error(`Archivo no encontrado: ${filePath}`);
        break;
      case 'EACCES':
        console.error(`Permiso denegado: ${filePath}`);
        break;
      default:
        console.error(`Error leyendo archivo: ${error.message}`);
    }
    return null;
  }
}
```

#### Verificar Antes de Actuar

```javascript
const fs = require('fs').promises;

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function safeWriteFile(filePath, data) {
  // Verificar si el archivo ya existe
  if (await fileExists(filePath)) {
    console.log('Advertencia: El archivo ya existe. Sobrescribiendo...');
  }

  // Asegurar que el directorio existe
  const directory = path.dirname(filePath);
  await fs.mkdir(directory, { recursive: true });

  // Escribir archivo
  await fs.writeFile(filePath, data, 'utf8');
  console.log('Archivo escrito exitosamente');
}
```

---

## 💻 Ejercicios Prácticos

### Ejercicio 1: Gestor de Configuración

Crea un gestor de configuración que lea/escriba archivos de configuración JSON de forma segura.

**Requisitos**:
- Leer configuración desde `config.json`
- Actualizar valores específicos
- Escribir configuración de vuelta al archivo
- Manejar archivo faltante con gracia (crear predeterminado)

**Código Inicial**:
```javascript
// configManager.js
const fs = require('fs').promises;
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'config.json');

const DEFAULT_CONFIG = {
  appName: 'MyApp',
  version: '1.0.0',
  port: 3000,
  debug: false
};

async function loadConfig() {
  // TODO: Intentar leer config.json
  // Si el archivo no existe, retornar DEFAULT_CONFIG
  // Si el archivo existe, parsear JSON y retornar
}

async function saveConfig(config) {
  // TODO: Escribir objeto config a archivo JSON
  // Usar indentación de 2 espacios para legibilidad
}

async function updateConfig(key, value) {
  // TODO: Cargar config, actualizar key, guardar
}

// Probar las funciones
async function test() {
  console.log('Cargando configuración...');
  const config = await loadConfig();
  console.log('Configuración actual:', config);

  console.log('\nActualizando puerto a 8080...');
  await updateConfig('port', 8080);

  console.log('\nRecargando configuración...');
  const updatedConfig = await loadConfig();
  console.log('Configuración actualizada:', updatedConfig);
}

test();
```

**Solución**:
```javascript
// configManager.js
const fs = require('fs').promises;
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'config.json');

const DEFAULT_CONFIG = {
  appName: 'MyApp',
  version: '1.0.0',
  port: 3000,
  debug: false
};

async function loadConfig() {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Archivo de configuración no encontrado, usando predeterminados');
      await saveConfig(DEFAULT_CONFIG);
      return DEFAULT_CONFIG;
    }
    throw error;
  }
}

async function saveConfig(config) {
  const jsonData = JSON.stringify(config, null, 2);
  await fs.writeFile(CONFIG_PATH, jsonData, 'utf8');
  console.log('Configuración guardada');
}

async function updateConfig(key, value) {
  const config = await loadConfig();
  config[key] = value;
  await saveConfig(config);
  console.log(`Actualizado ${key} a ${value}`);
}

// Probar las funciones
async function test() {
  console.log('Cargando configuración...');
  const config = await loadConfig();
  console.log('Configuración actual:', config);

  console.log('\nActualizando puerto a 8080...');
  await updateConfig('port', 8080);

  console.log('\nRecargando configuración...');
  const updatedConfig = await loadConfig();
  console.log('Configuración actualizada:', updatedConfig);
}

test().catch(error => console.error('Prueba falló:', error));
```

### Ejercicio 2: Sistema de Logging Simple

Construye un sistema de logging que escriba mensajes con marcas de tiempo a un archivo de log.

**Requisitos**:
- Crear archivo de log si no existe
- Añadir mensajes con marcas de tiempo
- Soportar diferentes niveles de log (INFO, WARN, ERROR)
- Rotar logs cuando el tamaño del archivo exceda 1MB

**Código Inicial**:
```javascript
// logger.js
const fs = require('fs').promises;
const path = require('path');

const LOG_PATH = path.join(__dirname, 'app.log');
const MAX_LOG_SIZE = 1024 * 1024; // 1MB

async function log(level, message) {
  // TODO: Crear entrada de log formateada
  // Formato: [2025-10-29T10:30:45.123Z] [INFO] Texto del mensaje
}

async function info(message) {
  await log('INFO', message);
}

async function warn(message) {
  await log('WARN', message);
}

async function error(message) {
  await log('ERROR', message);
}

// Prueba
(async () => {
  await info('Aplicación iniciada');
  await warn('Archivo de configuración faltante, usando predeterminados');
  await error('Conexión a base de datos falló');
})();
```

**Solución**:
```javascript
// logger.js
const fs = require('fs').promises;
const path = require('path');

const LOG_PATH = path.join(__dirname, 'app.log');
const MAX_LOG_SIZE = 1024 * 1024; // 1MB

async function checkLogRotation() {
  try {
    const stats = await fs.stat(LOG_PATH);
    if (stats.size > MAX_LOG_SIZE) {
      // Rotar log: renombrar actual a .old
      const oldLogPath = path.join(__dirname, 'app.log.old');
      await fs.rename(LOG_PATH, oldLogPath);
      console.log('Log rotado');
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error verificando rotación de log:', error.message);
    }
  }
}

async function log(level, message) {
  await checkLogRotation();

  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}\n`;

  try {
    await fs.appendFile(LOG_PATH, logEntry, 'utf8');
  } catch (error) {
    console.error('Error escribiendo log:', error.message);
  }
}

async function info(message) {
  await log('INFO', message);
}

async function warn(message) {
  await log('WARN', message);
}

async function error(message) {
  await log('ERROR', message);
}

// Prueba
(async () => {
  await info('Aplicación iniciada');
  await warn('Archivo de configuración faltante, usando predeterminados');
  await error('Conexión a base de datos falló');

  console.log('\nContenido del archivo de log:');
  const logs = await fs.readFile(LOG_PATH, 'utf8');
  console.log(logs);
})();
```

### Ejercicio 3: Organizador de Archivos

Crea una utilidad que organice archivos en carpetas por extensión.

**Requisitos**:
- Escanear un directorio buscando archivos
- Crear carpetas para cada extensión de archivo (jpg, txt, pdf, etc.)
- Mover archivos a las carpetas correspondientes
- Manejar errores con gracia

**Código Inicial**:
```javascript
// fileOrganizer.js
const fs = require('fs').promises;
const path = require('path');

async function organizeFiles(directoryPath) {
  // TODO: Leer contenidos del directorio
  // TODO: Agrupar archivos por extensión
  // TODO: Crear carpetas de extensiones
  // TODO: Mover archivos a carpetas
}

// Probar con directorio actual
organizeFiles(__dirname);
```

**Solución**:
```javascript
// fileOrganizer.js
const fs = require('fs').promises;
const path = require('path');

async function organizeFiles(directoryPath) {
  try {
    console.log(`Organizando archivos en: ${directoryPath}`);

    // Leer contenidos del directorio
    const files = await fs.readdir(directoryPath);

    // Agrupar archivos por extensión
    const filesByExtension = {};

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);

      // Saltar directorios
      if (stats.isDirectory()) continue;

      // Obtener extensión de archivo
      const ext = path.extname(file).slice(1) || 'sin-extension';

      if (!filesByExtension[ext]) {
        filesByExtension[ext] = [];
      }
      filesByExtension[ext].push(file);
    }

    // Crear carpetas y mover archivos
    for (const [ext, fileList] of Object.entries(filesByExtension)) {
      const folderPath = path.join(directoryPath, ext);

      // Crear carpeta de extensión
      try {
        await fs.mkdir(folderPath);
        console.log(`Carpeta creada: ${ext}/`);
      } catch (error) {
        if (error.code !== 'EEXIST') throw error;
      }

      // Mover archivos
      for (const file of fileList) {
        const oldPath = path.join(directoryPath, file);
        const newPath = path.join(folderPath, file);

        try {
          await fs.rename(oldPath, newPath);
          console.log(`Movido: ${file} → ${ext}/`);
        } catch (error) {
          console.error(`Error moviendo ${file}:`, error.message);
        }
      }
    }

    console.log('\n¡Organización completa!');
  } catch (error) {
    console.error('Error organizando archivos:', error.message);
  }
}

// Probar con un directorio de prueba
const testDir = path.join(__dirname, 'test-organize');
organizeFiles(testDir);
```

---

## 🤔 Reflexión Filosófica: Paciencia y Preparación

### La Virtud de la Paciencia (Operaciones Asíncronas)

**Marco Aurelio** escribió:

> *"Confínate al presente."*

El código asíncrono encarna este principio. Cuando escribes:

```javascript
await fs.readFile(path);
```

Estás diciendo: "Confío en que esto se completará cuando esté listo. Mientras tanto, permanezco presente para otras tareas."

Esto **no** es espera pasiva—es paciencia activa que permite a tu programa servir múltiples usuarios, manejar múltiples solicitudes y permanecer responsivo.

### La Virtud de la Preparación (Manejo de Errores)

**Séneca** enseñó:

> *"La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad."*

En operaciones de archivos, "suerte" es cuando tu código no se cae. La preparación es:

1. **Verificar** si los archivos existen antes de leer
2. **Crear** directorios antes de escribir archivos
3. **Manejar** todos los casos de error con gracia
4. **Validar** rutas antes de las operaciones

**Código No Preparado**:
```javascript
// Se caerá si el archivo no existe
const data = await fs.readFile('config.json', 'utf8');
```

**Código Preparado**:
```javascript
// Maneja todos los casos con gracia
try {
  const data = await fs.readFile('config.json', 'utf8');
  return JSON.parse(data);
} catch (error) {
  if (error.code === 'ENOENT') {
    console.warn('Config no encontrado, usando predeterminados');
    return DEFAULT_CONFIG;
  }
  throw error;
}
```

### Preguntas de Autoevaluación

1. **Paciencia**: ¿Cuándo fue la última vez que usaste operaciones bloqueantes (sync) cuando async habría sido mejor? ¿Por qué elegiste sync?

2. **Preparación**: Revisa tu código reciente. ¿Cuántas operaciones de archivos carecen de manejo de errores adecuado? ¿Cuántas asumen que los archivos/directorios existen?

3. **Orgullo vs Humildad**: ¿Alguna vez has omitido el manejo de errores porque "no fallará en mi escenario"? ¿Cómo puedes cultivar la programación defensiva?

---

## 📝 Resumen y Próximos Pasos

### Lista de Verificación de Puntos Clave

- [ ] **El módulo path** hace que las rutas de archivos sean seguras multiplataforma
- [ ] **Los métodos Sync** bloquean la ejecución, los métodos async no
- [ ] **Usa async/await** con fs.promises para código async limpio
- [ ] **Siempre maneja errores** en operaciones de archivos
- [ ] **Verifica antes de actuar**: verifica que archivos/directorios existan antes de las operaciones
- [ ] **Paciencia** (async) y **preparación** (errores) previenen el sufrimiento
- [ ] **La codificación importa**: utf8 para texto, Buffer para binario

### Lo que Hemos Aprendido

Ahora entiendes:
1. Cómo construir rutas de archivos seguras con el módulo `path`
2. Leer y escribir archivos (síncronos y asíncronos)
3. Trabajar con directorios (crear, leer, eliminar)
4. Patrones comprensivos de manejo de errores
5. Las virtudes Estoicas de paciencia y preparación en el código

### Vista Previa: Lección 3 - Módulos HTTP y URL

En la lección final de este minicurso, exploraremos:
- **Módulos http/https**: Construir servidores web desde cero
- **Módulo url**: Analizar y construir URLs
- Crear endpoints de API RESTful
- Manejar solicitudes y respuestas HTTP

**Conexión Estoica**: Discutiremos cómo servir a otros (servidores HTTP) requiere humildad y cómo los límites apropiados (manejo de errores) protegen tanto al servidor como al cliente.

---

## 🔗 Referencias

1. Node.js fs Documentation: https://nodejs.org/docs/latest/api/fs.html
2. Node.js path Documentation: https://nodejs.org/docs/latest/api/path.html
3. Node.js fs.promises API: https://nodejs.org/docs/latest/api/fs.html#promises-api
4. "El Enquiridión" de Epicteto - Penguin Classics
5. "Meditaciones" de Marco Aurelio - Libro 8, verso 32

---

**FIN DE LA LECCIÓN 2**

*Recuerda: La paciencia en la ejecución (async) y la preparación en la planificación (manejo de errores) son las marcas de un desarrollador maduro. Tu código debería anticipar obstáculos, no tropezar con ellos.*

🔴 **Siguiente**: Lección 3 - Módulos HTTP y URL (30 minutos)
