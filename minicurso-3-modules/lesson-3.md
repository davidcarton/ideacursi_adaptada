# 🧠 Cómo estudiar esta lección si te cuesta mantener la atención

1. **Lee en bloques cortos**, una sección cada vez.  
2. **Prueba el código inmediatamente**.  
3. **No memorices**, entiende con ejemplos.  
4. **Pausa breve** si notas saturación.  
5. **Vuelve atrás sin miedo** si algo no está claro.

---
# Lección 3: Módulos HTTP y URL - Sirviendo a Otros con Humildad

**Minicurso**: Módulos Integrados (Rojo - Superando el Orgullo)
**Lección**: 3 de 3
**Duración**: 30 minutos
**Tema Estoico**: Servicio y Límites - Servir a usuarios mientras se mantienen límites apropiados

---

## 🎯 Objetivos de Aprendizaje

Al final de esta lección, serás capaz de:

1. **Crear servidores HTTP** usando el módulo http integrado de Node.js
2. **Analizar URLs** y extraer parámetros de consulta usando el módulo url
3. **Manejar diferentes métodos HTTP** (GET, POST, PUT, DELETE)
4. **Implementar enrutamiento básico** sin frameworks externos
5. **Enviar respuestas HTTP apropiadas** con códigos de estado y encabezados
6. **Aplicar principios Estoicos** de servicio y límites en el diseño de servidores

---

## 📖 Introducción: La Filosofía del Servicio

### Servidores como Sirvientes

El propósito de un servidor web es **servir**—responder a solicitudes de otros. Sin embargo, este servicio requiere:
- **Humildad**: Reconocer que estás ahí para ayudar, no para impresionar
- **Límites**: Saber qué puedes y qué no puedes hacer
- **Claridad**: Comunicar claramente cuándo no puedes ayudar

**Epicteto** enseñó:

> *"Haz el mejor uso de lo que está en tu poder, y toma el resto como sucede."*

Tu servidor tiene poder sobre:
- Qué respuestas envía
- Cómo maneja errores
- Qué rutas soporta

Tu servidor NO tiene poder sobre:
- Qué solicitudes recibe
- Fallos de red
- Comportamiento del cliente

Esta lección te enseña a construir servidores que encarnan esta sabiduría: **útiles dentro de límites**.

### ¿Por Qué Aprender el Módulo HTTP en Lugar de Express?

Muchos desarrolladores saltan directamente a Express.js. Pero entender primero el módulo `http` es como aprender a caminar antes de correr:

1. **Apreciación**: Entenderás qué hace Express por ti
2. **Depuración**: Resolverás problemas de Express más efectivamente
3. **Minimalismo**: Para APIs simples, podrías no necesitar Express en absoluto
4. **Fundamentos**: Los conceptos HTTP se transfieren a todos los frameworks

Esto es **humildad en el aprendizaje**: dominar la fundación antes de añadir capas.

---

## 📚 Contenido Central

### 1. El Módulo HTTP: Construyendo Tu Primer Servidor

#### Servidor HTTP Mínimo

```javascript
const http = require('http');

// Crear servidor
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('¡Hola, Mundo!');
});

// Comenzar a escuchar
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
```

**Ejecutarlo**:
```bash
node server.js
# Visitar: http://localhost:3000
```

**Qué Está Pasando**:
1. `http.createServer()` crea una instancia de servidor
2. El callback recibe objetos `request` y `response`
3. `response.writeHead()` envía código de estado (200) y encabezados
4. `response.end()` envía el cuerpo y cierra la conexión
5. `server.listen()` comienza a aceptar conexiones en el puerto 3000

#### Entendiendo el Objeto Request

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Propiedades de Request
  console.log('Método:', req.method);        // GET, POST, PUT, DELETE
  console.log('URL:', req.url);              // /users/123?active=true
  console.log('Encabezados:', req.headers);  // { host: 'localhost:3000', ... }

  // Enviar respuesta
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    method: req.method,
    url: req.url,
    headers: req.headers
  }));
});

server.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
```

**Probarlo**:
```bash
curl http://localhost:3000/test?name=John
```

**Salida**:
```json
{
  "method": "GET",
  "url": "/test?name=John",
  "headers": {
    "host": "localhost:3000",
    "user-agent": "curl/7.79.1",
    "accept": "*/*"
  }
}
```

### 2. El Módulo URL: Analizando Solicitudes

#### Estructura de URL

```
http://www.example.com:8080/path/to/resource?key1=value1&key2=value2#section
│      │                 │    │               │                        │
│      │                 │    │               │                        └─ Hash
│      │                 │    │               └─────────────────────────── Query
│      │                 │    └──────────────────────────────────────────── Path
│      │                 └──────────────────────────────────────────────── Port
│      └───────────────────────────────────────────────────────────────── Host
└──────────────────────────────────────────────────────────────────────── Protocolo
```

#### Analizando URLs

**Método 1: url.parse() Legado**
```javascript
const url = require('url');

const urlString = 'http://localhost:3000/users?name=John&age=30';
const parsedUrl = url.parse(urlString, true);

console.log(parsedUrl.protocol);  // 'http:'
console.log(parsedUrl.host);      // 'localhost:3000'
console.log(parsedUrl.pathname);  // '/users'
console.log(parsedUrl.query);     // { name: 'John', age: '30' }
```

**Método 2: Constructor URL() Moderno (Recomendado)**
```javascript
const myURL = new URL('http://localhost:3000/users?name=John&age=30');

console.log(myURL.protocol);      // 'http:'
console.log(myURL.hostname);      // 'localhost'
console.log(myURL.port);          // '3000'
console.log(myURL.pathname);      // '/users'
console.log(myURL.search);        // '?name=John&age=30'
console.log(myURL.searchParams.get('name'));  // 'John'
console.log(myURL.searchParams.get('age'));   // '30'
```

#### Trabajando con Parámetros de Consulta

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Analizar URL
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // Extraer parámetros de consulta
  const name = query.name || 'Invitado';
  const age = query.age || 'Desconocida';

  // Enviar respuesta
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h1>Información del Usuario</h1>
    <p>Nombre: ${name}</p>
    <p>Edad: ${age}</p>
  `);
});

server.listen(3000);
```

**Probar**:
```bash
# Visitar: http://localhost:3000/?name=Alice&age=25
# Salida: Nombre: Alice, Edad: 25

# Visitar: http://localhost:3000/
# Salida: Nombre: Invitado, Edad: Desconocida
```

### 3. Manejando Métodos HTTP

```javascript
const http = require('http');
const url = require('url');

// Almacenamiento de datos en memoria
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Establecer encabezados de respuesta
  res.setHeader('Content-Type', 'application/json');

  // GET /users - Listar todos los usuarios
  if (method === 'GET' && pathname === '/users') {
    res.writeHead(200);
    res.end(JSON.stringify({ users }));
  }

  // GET /users/:id - Obtener usuario único
  else if (method === 'GET' && pathname.startsWith('/users/')) {
    const id = parseInt(pathname.split('/')[2]);
    const user = users.find(u => u.id === id);

    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify({ user }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Usuario no encontrado' }));
    }
  }

  // POST /users - Crear nuevo usuario
  else if (method === 'POST' && pathname === '/users') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const newUser = {
          id: users.length + 1,
          name: data.name
        };
        users.push(newUser);

        res.writeHead(201);
        res.end(JSON.stringify({ user: newUser }));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'JSON inválido' }));
      }
    });
  }

  // DELETE /users/:id - Eliminar usuario
  else if (method === 'DELETE' && pathname.startsWith('/users/')) {
    const id = parseInt(pathname.split('/')[2]);
    const index = users.findIndex(u => u.id === id);

    if (index !== -1) {
      users.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Usuario no encontrado' }));
    }
  }

  // 404 - Ruta no encontrada
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

server.listen(3000, () => {
  console.log('Servidor API corriendo en http://localhost:3000');
});
```

**Probar la API**:
```bash
# Listar todos los usuarios
curl http://localhost:3000/users

# Obtener usuario específico
curl http://localhost:3000/users/1

# Crear nuevo usuario
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie"}'

# Eliminar usuario
curl -X DELETE http://localhost:3000/users/2
```

### 4. Códigos de Estado HTTP: Comunicación Clara

Los códigos de estado HTTP comunes representan límites y resultados:

| Código | Significado | Caso de Uso |
|------|---------|----------|
| **200** | OK | GET, PUT, PATCH exitosos |
| **201** | Creado | POST exitoso (recurso creado) |
| **204** | Sin Contenido | DELETE exitoso (sin cuerpo retornado) |
| **400** | Solicitud Incorrecta | Entrada inválida del cliente |
| **401** | No Autorizado | Autenticación requerida |
| **403** | Prohibido | Autenticado pero no permitido |
| **404** | No Encontrado | El recurso no existe |
| **500** | Error Interno del Servidor | Error del lado del servidor |

**Ejemplo: Uso Apropiado de Códigos de Estado**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    // Simular búsqueda en base de datos
    const userId = parseInt(req.url.split('/')[2]);

    if (isNaN(userId)) {
      // El cliente envió datos inválidos
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Formato de ID de usuario inválido' }));
      return;
    }

    // Simular verificación de autenticación
    const isAuthenticated = req.headers.authorization === 'Bearer secret';
    if (!isAuthenticated) {
      res.writeHead(401);
      res.end(JSON.stringify({ error: 'Autenticación requerida' }));
      return;
    }

    // Simular recurso no encontrado
    if (userId > 100) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Usuario no encontrado' }));
      return;
    }

    // Éxito
    res.writeHead(200);
    res.end(JSON.stringify({ user: { id: userId, name: 'Usuario' } }));

  } catch (error) {
    // Error del lado del servidor
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Error interno del servidor' }));
  }
});

server.listen(3000);
```

### 5. Encabezados: Estableciendo Límites

**Encabezados de Respuesta Comunes**:
```javascript
res.setHeader('Content-Type', 'application/json');  // Formato de datos
res.setHeader('Cache-Control', 'no-cache');         // Reglas de caché
res.setHeader('Access-Control-Allow-Origin', '*');  // Política CORS
res.setHeader('X-Response-Time', '45ms');           // Metadata personalizada
```

**Encabezados de Seguridad**:
```javascript
// Prevenir ataques XSS
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');
res.setHeader('Content-Security-Policy', "default-src 'self'");

// Prevenir clickjacking
res.setHeader('X-XSS-Protection', '1; mode=block');
```

### 6. Manejo de Errores: Manteniendo Límites

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Establecer encabezados predeterminados
  res.setHeader('Content-Type', 'application/json');

  try {
    // Tu lógica de manejo de rutas
    if (req.url === '/error') {
      throw new Error('Error simulado');
    }

    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Éxito' }));

  } catch (error) {
    console.error('Error del servidor:', error);

    res.writeHead(500);
    res.end(JSON.stringify({
      error: 'Error interno del servidor',
      // No exponer detalles de error en producción
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message
      })
    }));
  }
});

// Manejar errores no capturados
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('El puerto 3000 ya está en uso');
  } else {
    console.error('Error del servidor:', error);
  }
});

server.listen(3000, () => {
  console.log('Servidor iniciado en puerto 3000');
});
```

---

## 💻 Ejercicios Prácticos

### Ejercicio 1: API JSON Simple

Crea una API RESTful para una lista de tareas usando solo módulos integrados.

**Requisitos**:
- GET /todos - Listar todas las tareas
- POST /todos - Crear nueva tarea
- PUT /todos/:id - Actualizar tarea
- DELETE /todos/:id - Eliminar tarea
- Códigos de estado apropiados y manejo de errores

**Código Inicial**:
```javascript
// todoAPI.js
const http = require('http');
const url = require('url');

let todos = [
  { id: 1, title: 'Aprender Node.js', completed: false },
  { id: 2, title: 'Construir una API', completed: false }
];

const server = http.createServer((req, res) => {
  // TODO: Implementar endpoints de la API
});

server.listen(3000, () => {
  console.log('API de Tareas corriendo en http://localhost:3000');
});
```

**Solución**:
```javascript
// todoAPI.js
const http = require('http');
const url = require('url');

let todos = [
  { id: 1, title: 'Aprender Node.js', completed: false },
  { id: 2, title: 'Construir una API', completed: false }
];

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  try {
    // GET /todos
    if (method === 'GET' && pathname === '/todos') {
      res.writeHead(200);
      res.end(JSON.stringify({ todos }));
    }

    // POST /todos
    else if (method === 'POST' && pathname === '/todos') {
      const data = await getRequestBody(req);

      if (!data.title) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'El título es requerido' }));
        return;
      }

      const newTodo = {
        id: todos.length + 1,
        title: data.title,
        completed: false
      };
      todos.push(newTodo);

      res.writeHead(201);
      res.end(JSON.stringify({ todo: newTodo }));
    }

    // PUT /todos/:id
    else if (method === 'PUT' && pathname.startsWith('/todos/')) {
      const id = parseInt(pathname.split('/')[2]);
      const todo = todos.find(t => t.id === id);

      if (!todo) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Tarea no encontrada' }));
        return;
      }

      const data = await getRequestBody(req);
      if (data.title) todo.title = data.title;
      if (data.completed !== undefined) todo.completed = data.completed;

      res.writeHead(200);
      res.end(JSON.stringify({ todo }));
    }

    // DELETE /todos/:id
    else if (method === 'DELETE' && pathname.startsWith('/todos/')) {
      const id = parseInt(pathname.split('/')[2]);
      const index = todos.findIndex(t => t.id === id);

      if (index === -1) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Tarea no encontrada' }));
        return;
      }

      todos.splice(index, 1);
      res.writeHead(204);
      res.end();
    }

    // 404
    else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }

  } catch (error) {
    console.error('Error del servidor:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Error interno del servidor' }));
  }
});

server.listen(3000, () => {
  console.log('API de Tareas corriendo en http://localhost:3000');
  console.log('Prueba: curl http://localhost:3000/todos');
});
```

**Probar**:
```bash
# Listar tareas
curl http://localhost:3000/todos

# Crear tarea
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Escribir pruebas"}'

# Actualizar tarea
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Eliminar tarea
curl -X DELETE http://localhost:3000/todos/2
```

### Ejercicio 2: Servidor de Archivos Estáticos

Crea un servidor que sirva archivos HTML, CSS y JavaScript.

**Requisitos**:
- Servir archivos desde un directorio 'public'
- Establecer Content-Type correcto basado en la extensión del archivo
- Retornar 404 para archivos faltantes
- Manejar errores con gracia

**Código Inicial**:
```javascript
// staticServer.js
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

const server = http.createServer(async (req, res) => {
  // TODO: Implementar lógica de servir archivos
});

server.listen(3000, () => {
  console.log('Servidor estático corriendo en http://localhost:3000');
});
```

**Solución**:
```javascript
// staticServer.js
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain'
};

const server = http.createServer(async (req, res) => {
  try {
    // Predeterminar a index.html para la raíz
    let filePath = req.url === '/' ? '/index.html' : req.url;

    // Construir ruta completa del archivo
    const fullPath = path.join(PUBLIC_DIR, filePath);

    // Seguridad: Prevenir directory traversal
    if (!fullPath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403);
      res.end('Prohibido');
      return;
    }

    // Leer archivo
    const content = await fs.readFile(fullPath);

    // Determinar Content-Type
    const ext = path.extname(fullPath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Enviar respuesta
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);

  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Archivo No Encontrado</h1>');
    } else {
      console.error('Error del servidor:', error);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Error Interno del Servidor</h1>');
    }
  }
});

server.listen(3000, () => {
  console.log('Servidor estático corriendo en http://localhost:3000');
  console.log(`Sirviendo archivos desde: ${PUBLIC_DIR}`);
});
```

**Crear archivos de prueba**:
```bash
mkdir -p public
echo '<h1>Hola desde HTML</h1>' > public/index.html
echo 'body { color: blue; }' > public/style.css
echo 'console.log("Hola desde JS");' > public/script.js
```

### Ejercicio 3: Utilidad Analizadora de URLs

Construye una utilidad que extraiga y muestre todos los componentes de una URL.

**Requisitos**:
- Analizar URL completa incluyendo protocolo, host, ruta, consulta, hash
- Extraer todos los parámetros de consulta como pares clave-valor
- Mostrar en salida formateada

**Solución**:
```javascript
// urlParser.js

function parseURL(urlString) {
  const myURL = new URL(urlString);

  console.log('=== ANALIZADOR DE URL ===\n');
  console.log('URL Completa:', myURL.href);
  console.log('\n--- Componentes ---');
  console.log('Protocolo:', myURL.protocol);
  console.log('Hostname:', myURL.hostname);
  console.log('Puerto:', myURL.port || '(predeterminado)');
  console.log('Pathname:', myURL.pathname);
  console.log('Search:', myURL.search || '(ninguno)');
  console.log('Hash:', myURL.hash || '(ninguno)');

  console.log('\n--- Parámetros de Consulta ---');
  if (myURL.search) {
    myURL.searchParams.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  } else {
    console.log('(ninguno)');
  }

  return {
    protocol: myURL.protocol,
    hostname: myURL.hostname,
    port: myURL.port,
    pathname: myURL.pathname,
    query: Object.fromEntries(myURL.searchParams),
    hash: myURL.hash
  };
}

// Prueba
const testURL = 'https://example.com:8080/api/users?name=John&age=30&active=true#section1';
const parsed = parseURL(testURL);
console.log('\n--- Objeto Analizado ---');
console.log(JSON.stringify(parsed, null, 2));
```

**Salida**:
```
=== ANALIZADOR DE URL ===

URL Completa: https://example.com:8080/api/users?name=John&age=30&active=true#section1

--- Componentes ---
Protocolo: https:
Hostname: example.com
Puerto: 8080
Pathname: /api/users
Search: ?name=John&age=30&active=true
Hash: #section1

--- Parámetros de Consulta ---
name: John
age: 30
active: true

--- Objeto Analizado ---
{
  "protocol": "https:",
  "hostname": "example.com",
  "port": "8080",
  "pathname": "/api/users",
  "query": {
    "name": "John",
    "age": "30",
    "active": "true"
  },
  "hash": "#section1"
}
```

---

## 🤔 Reflexión Filosófica: Servicio y Límites

### La Paradoja del Servicio

Un servidor existe para **servir**, pero también debe **proteger**. Esta es la paradoja Estoica:

**Séneca** escribió:

> *"No es el hombre que tiene muy poco, sino el hombre que ansía más, el que es pobre."*

Aplica esto a tu servidor:

**Servidor Pobre** (Sin Límites):
- Acepta todas las solicitudes sin validación
- Intenta procesar datos inválidos
- Se cae con errores
- Expone errores internos a los clientes

**Servidor Rico** (Límites Claros):
- Valida entrada (400 para solicitudes incorrectas)
- Autentica usuarios (401 para no autorizados)
- Maneja errores con gracia (500 con mensaje genérico)
- Comunica claramente (códigos de estado apropiados)

### La Virtud de la Comunicación Clara

Los códigos de estado HTTP son una forma de honestidad Estoica:

- **200 OK**: "Hice exitosamente lo que pediste"
- **404 No Encontrado**: "No puedo encontrar lo que buscas, y está bien"
- **400 Solicitud Incorrecta**: "Tu solicitud no es clara; por favor clarifica"
- **500 Error Interno**: "Fallé, pero te estoy protegiendo de los detalles"

Esto es **humildad**: admitir cuándo no tienes lo que alguien necesita, en lugar de pretender o romperte.

### Preguntas de Autoevaluación

1. **Servicio**: ¿Tu servidor verdaderamente sirve a los usuarios, o sirve a tu ego (sobre-diseñado, presumiendo)?

2. **Límites**: Revisa tu última API. ¿Valida entrada? ¿Retorna códigos de estado apropiados? ¿O acepta todo y espera lo mejor?

3. **Claridad**: Cuando tu servidor retorna errores, ¿son útiles? ¿O exponen detalles de implementación que confunden a los usuarios?

4. **Humildad**: ¿Te sientes tentado a construir todo desde cero (módulo http) o reconoces cuándo usar Express? Hay sabiduría en ambos—¿cuál es tu motivación?

---

## 📝 Resumen y Próximos Pasos

### Lista de Verificación de Puntos Clave

- [ ] **http.createServer()** crea un servidor web básico
- [ ] **Objeto Request** contiene método, url, encabezados
- [ ] **Objeto Response** usado para writeHead(), setHeader(), end()
- [ ] **Módulo URL** analiza URLs y parámetros de consulta
- [ ] **Métodos HTTP** (GET, POST, PUT, DELETE) mapean a operaciones CRUD
- [ ] **Códigos de estado** comunican resultados claramente
- [ ] **Encabezados** establecen límites (seguridad, caché, CORS)
- [ ] **Manejo de errores** mantiene la estabilidad del servidor
- [ ] **El servicio requiere límites**—saber qué puedes/no puedes hacer

### Lo que Hemos Aprendido

Ahora entiendes:
1. Cómo construir servidores HTTP sin frameworks
2. Análisis de URLs y extracción de parámetros de consulta
3. Implementación de patrones de API RESTful
4. Uso apropiado de códigos de estado
5. Los principios Estoicos de servicio y límites

### Completación del Curso: El Pilar Rojo

¡Felicitaciones por completar **Módulos Integrados**! Has aprendido:

**Habilidades Técnicas**:
- Módulos core de Node.js (os, path, fs, http, url)
- Operaciones del sistema de archivos (síncronas/asíncronas)
- Creación de servidores HTTP y enrutamiento
- Patrones de manejo de errores

**Lecciones Filosóficas**:
- **Humildad**: Usar lo que existe en lugar de reinventar
- **Paciencia**: Abrazar operaciones asíncronas
- **Preparación**: Programación defensiva con manejo de errores
- **Servicio**: Construir servidores que ayudan dentro de límites

### Vista Previa del Próximo Minicurso

**Minicurso 4: Programación Asíncrona y Event Loop (Naranja - Superando la Ira)**

En el próximo minicurso, aprenderás:
- Cómo funciona el event loop
- Callbacks, Promesas y async/await
- Manejo de errores asíncronos
- **Tema Estoico**: Paciencia ante la espera

**Conexión con la Ira**: La programación asíncrona nos enseña a soltar el control—a aceptar que algunas cosas toman tiempo. La ira surge de la impaciencia. El event loop es una meditación sobre la **aceptación**.

---

## 🔗 Referencias

1. Node.js http Documentation: https://nodejs.org/docs/latest/api/http.html
2. Node.js https Documentation: https://nodejs.org/docs/latest/api/https.html
3. Node.js url Documentation: https://nodejs.org/docs/latest/api/url.html
4. HTTP Status Codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
5. RESTful API Design: https://restfulapi.net/
6. "Cartas a Lucilio" de Séneca - Carta 1 (Sobre Ahorrar Tiempo)
7. "El Enquiridión" de Epicteto - Sección 1

---

## 🏆 Completación del Minicurso

¡Has completado **Minicurso 3: Módulos Integrados**!

### Logro Desbloqueado: 🔴 Pilar Rojo - Humildad Dominada

Has aprendido a:
- **Usar herramientas existentes** en lugar de reinventar la rueda
- **Servir a otros** con límites claros
- **Comunicar honestamente** a través de códigos de estado
- **Practicar paciencia** con operaciones asíncronas

### Verificación de Preparación

Antes de proceder al quiz, asegúrate de que puedes:
- [ ] Explicar la diferencia entre módulos integrados, locales y de terceros
- [ ] Usar el módulo path para rutas de archivos multiplataforma
- [ ] Leer/escribir archivos usando métodos síncronos y asíncronos
- [ ] Crear un servidor HTTP que maneje múltiples rutas
- [ ] Analizar URLs y extraer parámetros de consulta
- [ ] Retornar códigos de estado HTTP apropiados

### Próximos Pasos

1. **Tomar Quiz 3**: Prueba tu conocimiento de módulos integrados
2. **Practicar**: Construye una API CRUD completa usando solo módulos integrados
3. **Reflexionar**: Escribe en un diario sobre cómo los principios Estoicos aplican a tu código
4. **Preparar**: Revisa conceptos asíncronos antes del Minicurso 4

---

**FIN DE LA LECCIÓN 3 Y MINICURSO 3**

*Recuerda: El verdadero poder no viene de construir todo tú mismo, sino de saber qué herramientas usar y cuándo usarlas. La fortaleza de tu servidor no radica en aceptar todas las solicitudes, sino en manejarlas sabiamente.*

🔴 **Completado**: Módulos Integrados (Rojo - Superando el Orgullo)
🟠 **Siguiente**: Programación Asíncrona y Event Loop (Naranja - Superando la Ira)

---

*"El impedimento a la acción avanza la acción. Lo que está en el camino se convierte en el camino."*
— **Marco Aurelio**
