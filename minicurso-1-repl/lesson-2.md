# 🧠 Cómo estudiar esta lección si te cuesta mantener la atención

1. Lee por bloques pequeños.  
2. Prueba cada ejemplo en el REPL.  
3. Evita memorizar: experimenta.  
4. Haz pausas breves.  
5. Repite lo que no quede claro.  
6. Comprende el flujo paso a paso.

---
# Lección 2: Comandos Especiales y Atajos del REPL

## 🎯 Objetivos de Aprendizaje

Al completar esta lección, dominarás:

- Los 8 comandos especiales fundamentales del REPL (`.help`, `.save`, `.load`, etc.)
- Técnicas de autocompletado con Tab para explorar APIs
- Navegación eficiente del historial de comandos
- Gestión de sesiones con guardado y carga de código
- Atajos de teclado para maximizar tu productividad
- El modo `.editor` para escribir código multi-línea complejo

---

## 💭 Reflexión Estoica: Dominio a Través de la Práctica Deliberada

> "No es suficiente saber, también debemos aplicar. No es suficiente querer, también debemos hacer." — Johann Wolfgang von Goethe (citado frecuentemente en filosofía estoica)

En la lección anterior, venciste la pereza inicial al comenzar a experimentar. Ahora, el siguiente nivel de maestría requiere **práctica deliberada**: conocer no solo *qué* puedes hacer, sino *cómo* hacerlo eficientemente.

Los comandos especiales del REPL son como las herramientas de un artesano. Puedes construir algo usando solo tus manos, pero dominar las herramientas correctas multiplica tu capacidad. La filosofía estoica valora la **virtud práctica** sobre el conocimiento teórico. Esta lección te equipa con habilidades prácticas que usarás diariamente.

---

## 📋 Los 8 Comandos Especiales Fundamentales

Todos los comandos especiales del REPL comienzan con un punto (`.`). Aquí está tu arsenal completo:

### 1. `.help` - Tu Manual de Referencia

El comando más importante cuando olvidas algo o quieres explorar capacidades.

```javascript
> .help
.break    Sometimes you get stuck, this gets you out
.clear    Alias for .break
.editor   Enter editor mode
.exit     Exit the REPL
.help     Print this help message
.load     Load JS from a file into the REPL session
.save     Save all evaluated commands in this REPL session to a file
```

**Uso práctico:** Cuando estás experimentando y olvidas un comando, simplemente escribe `.help` en lugar de salir del REPL para buscar documentación online.

---

### 2. `.clear` - Reiniciar el Contexto

Limpia todas las variables y funciones definidas, dándote un lienzo en blanco sin salir del REPL.

```javascript
> const x = 100
undefined
> const y = 200
undefined
> x + y
300
> .clear
Clearing context...
> x
Uncaught ReferenceError: x is not defined
```

**Caso de uso:** Estás experimentando con diferentes enfoques para resolver un problema y quieres empezar de cero sin perder tu posición en la terminal.

**⚠️ Importante:** `.clear` NO limpia el historial de comandos. Puedes seguir usando las flechas arriba/abajo para acceder a comandos previos.

---

### 3. `.break` - Escapar de Código Incompleto

A veces escribes código multi-línea y te das cuenta a mitad de camino que cometiste un error. `.break` te saca del modo multi-línea.

```javascript
> function calcularArea(
...   radio,
...   // Oops, olvidé el parámetro altura
...   // Necesito salir sin completar esto
... .break
>
```

**Sin `.break`, tendrías que:**
- Completar el código erróneo
- Ver el error
- Volver a empezar

**Con `.break`:**
- Sales inmediatamente
- Conservas tu contexto limpio
- Empiezas de nuevo sin frustración

---

### 4. `.save <archivo>` - Guardar Tu Sesión

Uno de los comandos más poderosos. Guarda **toda** tu sesión REPL en un archivo `.js` que puedes ejecutar o editar después.

```javascript
> const sumar = (a, b) => a + b
undefined
> const multiplicar = (a, b) => a * b
undefined
> sumar(5, 3)
8
> multiplicar(4, 7)
28
> .save mi-sesion.js
Session saved to: mi-sesion.js
```

**Contenido de `mi-sesion.js`:**
```javascript
const sumar = (a, b) => a + b
const multiplicar = (a, b) => a * b
sumar(5, 3)
multiplicar(4, 7)
```

**Flujo de trabajo profesional:**
1. Experimentas en el REPL
2. Encuentras una solución que funciona
3. `.save solucion.js`
4. Editas el archivo en tu IDE
5. Integras a tu proyecto

---

### 5. `.load <archivo>` - Cargar Código Existente

El complemento perfecto de `.save`. Carga un archivo JavaScript en tu sesión REPL actual.

**Ejemplo: Crear `utilidades.js`**
```javascript
// utilidades.js
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

module.exports = { celsiusToFahrenheit, fahrenheitToCelsius };
```

**Cargar y usar en el REPL:**
```javascript
> .load utilidades.js
const { celsiusToFahrenheit, fahrenheitToCelsius } = require('./utilidades.js');

> celsiusToFahrenheit(0)
32
> celsiusToFahrenheit(100)
212
> fahrenheitToCelsius(32)
0
> fahrenheitToCelsius(98.6)
37
```

**Caso de uso avanzado:** Tienes un módulo en tu proyecto que quieres probar interactivamente sin crear un script de prueba completo.

---

### 6. `.editor` - Modo Editor Multi-línea

Cuando necesitas escribir bloques de código complejos, el modo `.editor` te da un mini-editor dedicado.

```javascript
> .editor
// Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)

function calcularImpuesto(precio, porcentaje) {
  const impuesto = precio * (porcentaje / 100);
  const total = precio + impuesto;
  
  return {
    precioBase: precio,
    impuesto: impuesto,
    total: total
  };
}

// Presiona Ctrl+D aquí
undefined

> calcularImpuesto(100, 21)
{ precioBase: 100, impuesto: 21, total: 121 }
```

**Ventajas sobre escribir directamente:**
- Puedes usar tu editor de texto con syntax highlighting (si tu terminal lo soporta)
- Editas múltiples líneas sin los `...` en cada línea
- Puedes copiar/pegar bloques grandes sin problemas

**Atajos en modo `.editor`:**
- `Ctrl+D` - Finalizar y ejecutar el código
- `Ctrl+C` - Cancelar sin ejecutar

---

### 7. `.exit` - Salir del REPL

El más simple pero hay múltiples formas:

```javascript
> .exit
```

**Alternativas equivalentes:**
- `Ctrl + C` (dos veces)
- `Ctrl + D` (una vez en Linux/macOS)
- `process.exit()` (método programático)

**Nota sobre el contexto:** Al salir, pierdes toda tu sesión (variables, funciones). Por eso `.save` es tan importante antes de cerrar.

---

## ⌨️ Atajos de Teclado Esenciales

El REPL soporta atajos de terminal estándar que te hacen extremadamente productivo:

### Navegación del Historial

| Atajo | Función |
|-------|---------|
| `↑` (Flecha Arriba) | Comando anterior |
| `↓` (Flecha Abajo) | Comando siguiente |
| `Ctrl + R` | Búsqueda reversa en historial |
| `Ctrl + S` | Búsqueda hacia adelante |

**Búsqueda reversa en acción:**
```
(reverse-i-search)`map': const numeros = [1,2,3,4,5]; numeros.map(n => n * 2)
```

Escribe `Ctrl + R`, luego comienza a escribir parte del comando que buscas. El REPL buscará en tu historial y mostrará coincidencias.

### Edición de Línea

| Atajo | Función |
|-------|---------|
| `Ctrl + A` | Ir al inicio de la línea |
| `Ctrl + E` | Ir al final de la línea |
| `Ctrl + K` | Borrar desde cursor hasta final |
| `Ctrl + U` | Borrar desde cursor hasta inicio |
| `Ctrl + W` | Borrar palabra anterior |
| `Ctrl + L` | Limpiar pantalla (mantiene contexto) |

**Ejemplo práctico:**
```javascript
> const resultado = calcularPromedio(10, 20, 30, 40, 50)
  // Cursor está al final, pero quieres cambiar "calcularPromedio" por "calcularMediana"
  // Presiona Ctrl+A para ir al inicio
> |const resultado = calcularPromedio(...)
  // Ahora Ctrl+→ varias veces para llegar a "calcularPromedio"
  // Ctrl+W para borrar la palabra
  // Escribe "calcularMediana"
```

---

## 🔍 Autocompletado con Tab: Tu Mejor Aliado

El autocompletado con `Tab` es quizás la característica más infrautilizada del REPL. Es como tener documentación interactiva en tiempo real.

### Explorando APIs de Objetos Globales

```javascript
> console.
console.assert    console.clear     console.count     console.debug
console.dir       console.dirxml    console.error     console.group
console.groupEnd  console.info      console.log       console.table
console.time      console.timeEnd   console.timeLog   console.trace
console.warn

// Escribe "console." y presiona Tab dos veces
```

### Explorando Módulos Node.js

```javascript
> const fs = require('fs')
undefined

> fs.
fs.access            fs.accessSync        fs.appendFile        fs.appendFileSync
fs.chmod             fs.chmodSync         fs.chown             fs.chownSync
fs.close             fs.closeSync         fs.constants         fs.copyFile
fs.copyFileSync      fs.createReadStream  fs.createWriteStream fs.exists
// ... más de 80 métodos
```

**Uso estratégico:**
1. Requiere un módulo
2. Escribe `moduleName.` y presiona Tab
3. Explora los métodos disponibles visualmente
4. Encuentra el método que necesitas sin buscar en la documentación

### Autocompletado de Variables

```javascript
> const miVariableLargaYDescriptiva = 42
undefined

> miVar  // Presiona Tab
> miVariableLargaYDescriptiva
42
```

El REPL autocompleta nombres de variables que has definido, ahorrándote tiempo de escritura.

---

## 📜 Gestión del Historial de Comandos

El REPL guarda automáticamente tu historial en `~/.node_repl_history` (Linux/macOS) o `%USERPROFILE%\.node_repl_history` (Windows).

### Persistencia Entre Sesiones

```bash
# Sesión 1
$ node
> const secreto = 'mi-api-key'
> .exit

# Sesión 2 (días después)
$ node
> // Presiona ↑ varias veces
> const secreto = 'mi-api-key'  // ¡Aparece!
```

### Limitar el Tamaño del Historial

Por defecto, el REPL guarda 1000 líneas. Puedes cambiarlo:

```bash
# Antes de iniciar Node
$ NODE_REPL_HISTORY_SIZE=5000 node
```

### Deshabilitar el Historial

Si trabajas con datos sensibles (contraseñas, API keys):

```bash
$ NODE_REPL_HISTORY="" node
```

**⚠️ Seguridad:** El historial se guarda en texto plano. No guardes secretos en producción.

---

## 🧪 Casos de Uso Profesionales

### Caso 1: Prototipado Rápido de Funciones

**Escenario:** Necesitas una función para validar emails antes de implementarla en tu aplicación.

```javascript
> .editor
// Entering editor mode...

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Ctrl+D

> validarEmail('usuario@dominio.com')
true
> validarEmail('email-invalido')
false
> validarEmail('otro@ejemplo.co.uk')
true

> .save email-validator.js
Session saved to: email-validator.js
```

**Ventaja:** Probaste tu función con múltiples casos en 2 minutos, sin crear archivos de prueba.

---

### Caso 2: Debugging de Módulos Propios

**Archivo `database.js` en tu proyecto:**
```javascript
// database.js
class Database {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }
  
  connect() {
    console.log('Conectando a:', this.config.host);
    this.connection = { status: 'connected' };
  }
  
  query(sql) {
    if (!this.connection) {
      throw new Error('Not connected');
    }
    return `Ejecutando: ${sql}`;
  }
}

module.exports = Database;
```

**Testing en REPL:**
```javascript
> const Database = require('./database.js')
undefined

> const db = new Database({ host: 'localhost', port: 5432 })
undefined

> db.connection
null

> db.connect()
Conectando a: localhost
undefined

> db.connection
{ status: 'connected' }

> db.query('SELECT * FROM users')
'Ejecutando: SELECT * FROM users'
```

**Ventaja:** Probaste tu clase interactivamente sin escribir un script de prueba completo ni configurar un framework de testing.

---

### Caso 3: Exploración de APIs Externas

```javascript
> const https = require('https')
undefined

> https.  // Presiona Tab
https.Agent              https.Server             https.createServer
https.get                https.globalAgent        https.request

> // Vamos a explorar https.request
> https.request
[Function: request]

> https.get
[Function: get]
```

Puedes explorar qué métodos expone un módulo antes de usarlo, sin tener que abrir la documentación.

---

## 💡 Técnicas Avanzadas de Productividad

### Técnica 1: Cadena de Comandos con `_`

Recuerda que `_` almacena el último resultado:

```javascript
> [1, 2, 3, 4, 5]
[ 1, 2, 3, 4, 5 ]

> _.map(n => n * 2)
[ 2, 4, 6, 8, 10 ]

> _.filter(n => n > 5)
[ 6, 8, 10 ]

> _.reduce((sum, n) => sum + n, 0)
24
```

Cada operación se aplica sobre el resultado anterior sin crear variables intermedias.

---

### Técnica 2: Comandos Multi-línea Sin `.editor`

Para bloques pequeños, puedes escribir multi-línea directamente:

```javascript
> const usuario = {
... nombre: 'Ana',
... calcularEdad() {
...   return new Date().getFullYear() - this.añoNacimiento;
... },
... añoNacimiento: 1995
... }
undefined

> usuario.calcularEdad()
30
```

**Tip:** El REPL detecta automáticamente llaves, paréntesis, o corchetes sin cerrar y te da una nueva línea con `...`.

---

### Técnica 3: Recargar Código Modificado

Imagina que cargaste `utilidades.js`, pero hiciste cambios al archivo:

```javascript
> .load utilidades.js
// ... funciones cargadas

> // Haces cambios en el archivo externo

> .clear  // Limpia el contexto anterior
> .load utilidades.js  // Recarga con los cambios nuevos
```

**Workflow híbrido:**
1. Edita en tu IDE
2. Recarga en REPL
3. Prueba interactivamente
4. Repite hasta que funcione

---

## 🎯 Variables Especiales del REPL

Además de `_`, el REPL proporciona otras variables útiles:

### `_error` - Último Error

```javascript
> JSON.parse('invalid json')
Uncaught SyntaxError: Unexpected token i in JSON at position 0

> _error
SyntaxError: Unexpected token i in JSON at position 0
    at JSON.parse (<anonymous>)

> _error.message
'Unexpected token i in JSON at position 0'

> _error.name
'SyntaxError'
```

**Uso:** Cuando obtienes un error, puedes inspeccionar sus propiedades sin volver a ejecutar el código fallido.

---

## ✅ Checklist de Dominio de Comandos

Marca cada ítem cuando lo hayas practicado al menos 3 veces:

- [ ] **Usar `.help`** para ver todos los comandos disponibles
- [ ] **Usar `.clear`** para reiniciar el contexto sin salir
- [ ] **Usar `.break`** para escapar de código multi-línea incompleto
- [ ] **Usar `.save`** para guardar una sesión experimental exitosa
- [ ] **Usar `.load`** para cargar código de un archivo
- [ ] **Usar `.editor`** para escribir funciones complejas
- [ ] **Navegar historial** con ↑/↓ eficientemente
- [ ] **Búsqueda reversa** con `Ctrl+R` para encontrar comandos antiguos
- [ ] **Autocompletado con Tab** para explorar APIs de módulos
- [ ] **Usar `_`** para encadenar operaciones sobre resultados previos
- [ ] **Usar `_error`** para inspeccionar errores

---

## 🚀 Ejercicios Prácticos

### Ejercicio 1: Workflow Completo de Prototipado

Completa este workflow sin salir del REPL:

1. Entra en modo `.editor`
2. Escribe una función `calcularDescuento(precio, porcentaje)`
3. Pruébala con 3 precios diferentes
4. Guarda la sesión como `descuentos.js`
5. Sal del REPL
6. Vuelve a entrar y carga `descuentos.js`
7. Verifica que la función sigue funcionando

**Solución:**
```javascript
> .editor
function calcularDescuento(precio, porcentaje) {
  return precio - (precio * porcentaje / 100);
}
// Ctrl+D

> calcularDescuento(100, 10)
90
> calcularDescuento(50, 20)
40
> calcularDescuento(200, 15)
170

> .save descuentos.js
Session saved to: descuentos.js

> .exit

$ node
> .load descuentos.js
> calcularDescuento(100, 10)
90
```

---

### Ejercicio 2: Explorando Módulos con Tab

1. Requiere el módulo `path`
2. Usa Tab para ver todos sus métodos
3. Encuentra el método que devuelve la extensión de un archivo
4. Pruébalo con 'documento.pdf'

**Solución:**
```javascript
> const path = require('path')
undefined

> path.  // Presiona Tab dos veces
path.basename  path.delimiter  path.dirname  path.extname  path.format
path.isAbsolute  path.join  path.normalize  path.parse  path.posix
path.relative  path.resolve  path.sep  path.toNamespacedPath  path.win32

> path.extname
[Function: extname]

> path.extname('documento.pdf')
'.pdf'

> path.extname('imagen.jpg')
'.jpg'

> path.extname('script')
''
```

---

### Ejercicio 3: Uso de `_` para Transformaciones

Crea un array, transfórmalo en múltiples pasos usando solo `_`:

```javascript
> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

> _.filter(n => n % 2 === 0)  // Solo pares
[ 2, 4, 6, 8, 10 ]

> _.map(n => n * n)  // Elevar al cuadrado
[ 4, 16, 36, 64, 100 ]

> _.reduce((sum, n) => sum + n, 0)  // Sumar todos
220
```

---

## 🧠 Reflexión Final: Eficiencia como Virtud

> "Es la calidad más que la cantidad lo que importa." — Séneca

Los comandos del REPL no son solo atajos técnicos. Representan la **virtud estoica de la eficiencia**: lograr más con menos esfuerzo desperdiciado. Cada vez que usas `.save` en lugar de copiar-pegar manualmente, o Tab en lugar de buscar en documentación, estás practicando la virtud de la **practicidad**.

El desarrollador estoico no busca memorizar todo, sino dominar las herramientas que multiplican su capacidad de acción. El REPL, con sus comandos y atajos, es una de esas herramientas fundamentales.

---

## 📖 Resumen de Comandos

| Comando | Función | Cuando Usarlo |
|---------|---------|---------------|
| `.help` | Mostrar ayuda | Olvidaste un comando |
| `.clear` | Reiniciar contexto | Empezar de cero sin salir |
| `.break` | Salir de multi-línea | Código incompleto que quieres cancelar |
| `.save <file>` | Guardar sesión | Encontraste una solución que funciona |
| `.load <file>` | Cargar código | Quieres probar código de un archivo |
| `.editor` | Modo editor | Escribir funciones complejas |
| `.exit` | Salir del REPL | Terminar la sesión |

| Atajo | Función |
|-------|---------|
| `Tab` | Autocompletar / Ver propiedades |
| `↑` / `↓` | Navegar historial |
| `Ctrl + R` | Búsqueda reversa |
| `Ctrl + C` (2x) | Salir del REPL |
| `Ctrl + D` | Finalizar `.editor` o salir |
| `Ctrl + L` | Limpiar pantalla |

---

**Duración estimada:** 30 minutos
**Prerequisitos:** Lección 1 completada
**Siguiente lección:** Debugging with REPL

---

*"El sabio actúa sin prisa y sin pausa." — Proverbio estoico*

*En el REPL, actúas con comandos precisos que ahorran tiempo sin sacrificar comprensión.*
