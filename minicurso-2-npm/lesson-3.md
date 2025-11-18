# 🧠 Cómo estudiar esta lección si te cuesta mantener la atención

1. **Lee en bloques cortos**, una sección cada vez.  
2. **Prueba todo en tu terminal inmediatamente**.  
3. **Evita memorizar**: la comprensión viene al repetir.  
4. **No avances si algo no quedó claro**, vuelve una sección atrás.  
5. **Haz pausas pequeñas** para evitar saturación.  
6. **Convierte cada ejemplo en acción** escribiéndolo tú mismo.

---
# Lección 3: Publicar y Compartir Paquetes NPM

**Minicurso:** Pilar 2 - NPM (Yellow - Overcoming Greed)  
**Nivel:** Intermediate to Advanced  
**Duración estimada:** 55 minutos  
**Filosofía Estoica:** La generosidad como antídoto contra la codicia

---

## 🎯 Objetivos de Aprendizaje

Al completar esta lección, serás capaz de:

- Preparar un paquete para publicación en NPM
- Entender y aplicar mejores prácticas de versionado
- Publicar tu primer paquete en el registro público de NPM
- Actualizar y deprecar paquetes existentes
- Usar scopes para paquetes privados y organizacionales
- Escribir documentación efectiva (README, CHANGELOG)
- Aplicar la virtud estoica de la generosidad en tu código

---

## 📖 Introducción: De Consumidor a Contribuidor

Has aprendido a **consumir** paquetes de NPM. Ahora es momento de **contribuir**. Este es el círculo virtuoso del open source: recibes gratis, devuelves cuando puedes.

Séneca escribió: *"Mientras enseñamos, aprendemos"*. Al publicar un paquete, no solo compartes conocimiento; lo solidificas. Crear algo que otros puedan usar te obliga a:

- Pensar en claridad de API
- Documentar exhaustivamente
- Considerar casos extremos
- Mantener compatibilidad

Este es un ejercicio de **generosidad técnica** que beneficia tanto al dador como al receptor.

---

## 🎁 Preparando tu Paquete para Publicación

### 1. Crear una Cuenta en NPM

Si aún no tienes cuenta:

```bash
npm adduser
```

O visita [npmjs.com](https://www.npmjs.com) y regístrate. Luego:

```bash
npm login
```

Verifica tu cuenta:

```bash
npm whoami
# Salida: tu-nombre-de-usuario
```

### 2. Estructura de Proyecto Recomendada

```
mi-paquete/
├── src/                  # Código fuente
│   └── index.js
├── test/                 # Tests
│   └── index.test.js
├── .gitignore
├── .npmignore            # Archivos excluidos de npm publish
├── LICENSE               # Licencia (MIT, Apache, etc.)
├── README.md             # Documentación
├── CHANGELOG.md          # Historial de cambios
└── package.json          # Manifest
```

### 3. package.json para Publicación

```json
{
  "name": "mi-utilidad-strings",
  "version": "1.0.0",
  "description": "Utilidades para manipular strings en JavaScript",
  "main": "src/index.js",
  "scripts": {
    "test": "jest",
    "prepublishOnly": "npm test"
  },
  "keywords": [
    "strings",
    "utilities",
    "text",
    "manipulation"
  ],
  "author": "Tu Nombre <tu@email.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/tu-usuario/mi-utilidad-strings"
  },
  "bugs": {
    "url": "https://github.com/tu-usuario/mi-utilidad-strings/issues"
  },
  "homepage": "https://github.com/tu-usuario/mi-utilidad-strings#readme",
  "devDependencies": {
    "jest": "^29.5.0"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

**Campos críticos**:
- `name`: Debe ser único en el registro de NPM
- `version`: Sigue Semantic Versioning (MAJOR.MINOR.PATCH)
- `main`: Punto de entrada cuando alguien hace `require('mi-paquete')`
- `keywords`: Mejora descubribilidad en búsquedas
- `license`: Especifica cómo otros pueden usar tu código
- `repository`: Enlace al código fuente
- `engines`: Versiones de Node.js soportadas

### 4. Verificar Nombre Disponible

```bash
npm search mi-utilidad-strings
```

Si aparecen resultados, el nombre ya está tomado. Considera:
- `mi-nombre-utilidad-strings`
- `@tu-usuario/utilidad-strings` (scoped package)
- Variación creativa del nombre

### 5. .npmignore

Excluye archivos innecesarios del paquete publicado:

```
# .npmignore
node_modules/
test/
.github/
.vscode/
coverage/
*.log
.env
.DS_Store
```

Si no existe `.npmignore`, NPM usa `.gitignore` por defecto.

---

## 📤 Publicando tu Primer Paquete

### Paso a Paso: Ejemplo Completo

Vamos a crear y publicar una utilidad simple:

**1. Crear proyecto**:
```bash
mkdir string-capitalizer
cd string-capitalizer
npm init -y
```

**2. Editar package.json**:
```json
{
  "name": "@tu-usuario/string-capitalizer",
  "version": "1.0.0",
  "description": "Capitaliza la primera letra de cada palabra",
  "main": "index.js",
  "scripts": {
    "test": "node test.js"
  },
  "keywords": ["string", "capitalize", "text"],
  "author": "Tu Nombre",
  "license": "MIT"
}
```

**3. Crear index.js**:
```javascript
/**
 * Capitaliza la primera letra de cada palabra en un string
 * @param {string} text - El texto a capitalizar
 * @returns {string} El texto capitalizado
 */
function capitalize(text) {
  if (typeof text !== 'string') {
    throw new TypeError('Input must be a string');
  }
  
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

module.exports = capitalize;
```

**4. Crear test.js**:
```javascript
const capitalize = require('./index');

console.assert(
  capitalize('hello world') === 'Hello World',
  'Should capitalize each word'
);

console.assert(
  capitalize('HELLO WORLD') === 'Hello World',
  'Should handle uppercase input'
);

console.log('✅ All tests passed');
```

**5. Crear README.md**:
```markdown
# @tu-usuario/string-capitalizer

Capitaliza la primera letra de cada palabra en un string.

## Instalación

\`\`\`bash
npm install @tu-usuario/string-capitalizer
\`\`\`

## Uso

\`\`\`javascript
const capitalize = require('@tu-usuario/string-capitalizer');

capitalize('hello world');  // 'Hello World'
capitalize('HELLO WORLD');  // 'Hello World'
\`\`\`

## API

### capitalize(text)

- **text** (string): El texto a capitalizar
- **Retorna**: (string) El texto capitalizado

## Licencia

MIT
```

**6. Probar localmente**:
```bash
npm test
```

**7. Verificar contenido del paquete**:
```bash
npm pack --dry-run
```

Esto muestra qué archivos se incluirán en el paquete:
```
npm notice 
npm notice 📦  @tu-usuario/string-capitalizer@1.0.0
npm notice === Tarball Contents === 
npm notice 123B index.js    
npm notice 456B package.json
npm notice 789B README.md   
npm notice === Tarball Details === 
npm notice name:          @tu-usuario/string-capitalizer                
npm notice version:       1.0.0                                   
npm notice package size:  1.2 kB                                  
npm notice unpacked size: 1.4 kB                                  
npm notice total files:   3
```

**8. Publicar**:
```bash
npm publish --access public
```

(Para scoped packages, `--access public` es necesario la primera vez, a menos que pagues por paquetes privados)

**Salida esperada**:
```
+ @tu-usuario/string-capitalizer@1.0.0
```

🎉 **¡Felicidades! Has publicado tu primer paquete NPM.**

Verifica en: `https://www.npmjs.com/package/@tu-usuario/string-capitalizer`

---

## 🔄 Actualizando Paquetes Publicados

### Versionado Semántico (Repaso)

Recuerda: `MAJOR.MINOR.PATCH`

- **PATCH** (1.0.1): Bug fixes, sin cambios en API
- **MINOR** (1.1.0): Nueva funcionalidad, compatible hacia atrás
- **MAJOR** (2.0.0): Breaking changes

### Comandos de Versionado

```bash
# Incrementar versión automáticamente
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.1 → 1.1.0
npm version major   # 1.1.0 → 2.0.0

# Especificar versión exacta
npm version 1.2.3

# Versión pre-release
npm version 2.0.0-beta.1
```

Estos comandos:
1. Actualizan `package.json`
2. Crean un commit en Git
3. Crean un tag Git

### Workflow de Actualización

**1. Hacer cambios en tu código**:
```javascript
// index.js - añadir nueva función
function capitalizeFirst(text) {
  if (typeof text !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

module.exports = {
  capitalize,
  capitalizeFirst  // Nueva función
};
```

**2. Actualizar README.md** con la nueva funcionalidad

**3. Actualizar CHANGELOG.md**:
```markdown
# Changelog

## [1.1.0] - 2025-10-29

### Added
- Nueva función `capitalizeFirst()` para capitalizar solo la primera palabra

## [1.0.0] - 2025-10-28

### Added
- Función inicial `capitalize()` para capitalizar todas las palabras
```

**4. Ejecutar tests**:
```bash
npm test
```

**5. Incrementar versión**:
```bash
npm version minor
# 1.0.0 → 1.1.0
```

**6. Publicar**:
```bash
npm publish
```

**7. Push a Git**:
```bash
git push origin main --tags
```

---

## 🏷️ Scoped Packages y Organizaciones

### Scoped Packages

Los paquetes con scope tienen el formato `@scope/package-name`. Ventajas:

- **Evita colisiones de nombres**: Múltiples personas pueden tener `@alice/utils` y `@bob/utils`
- **Organización clara**: Todos los paquetes de tu empresa bajo `@mi-empresa/`
- **Paquetes privados**: Más fácil gestionar permisos

**Crear scoped package**:
```bash
npm init --scope=@tu-usuario
```

O edita manualmente:
```json
{
  "name": "@tu-usuario/mi-paquete"
}
```

**Publicar scoped package**:
```bash
# Primera vez (debe ser público a menos que pagues)
npm publish --access public

# Subsecuentes publicaciones
npm publish
```

### Organizaciones en NPM

Las organizaciones permiten colaboración en múltiples paquetes:

**Crear organización**:
1. Ve a npmjs.com → Settings → Organizations → Create Organization
2. Invita miembros
3. Publica paquetes bajo `@mi-organizacion/paquete`

**Permisos**:
- **Owner**: Control completo
- **Admin**: Gestionar paquetes y miembros
- **Member**: Publicar y actualizar paquetes

---

## 📋 Mejores Prácticas de Documentación

### README.md Excelente

Un buen README debe tener:

```markdown
# Nombre del Paquete

[Badges: npm version, build status, coverage, license]

Breve descripción de una línea.

## ¿Por qué?

Problema que resuelve tu paquete.

## Instalación

\`\`\`bash
npm install mi-paquete
\`\`\`

## Uso Rápido

\`\`\`javascript
const miPaquete = require('mi-paquete');
// Ejemplo simple que funciona inmediatamente
\`\`\`

## API

### función1(param1, param2)
Descripción detallada.

**Parámetros:**
- `param1` (string): Descripción
- `param2` (number, optional): Descripción. Default: 10

**Retorna:** (object) Descripción del objeto retornado

**Ejemplo:**
\`\`\`javascript
const resultado = función1('hola', 5);
// { ... }
\`\`\`

## Configuración Avanzada

[Opcional] Para casos de uso complejos.

## Contribuir

Pull requests bienvenidos. Para cambios mayores, abre un issue primero.

## Licencia

[MIT](LICENSE)
```

### CHANGELOG.md

Sigue el formato [Keep a Changelog](https://keepachangelog.com/):

```markdown
# Changelog

## [Unreleased]
### Added
- Cambios próximos aún no publicados

## [1.2.0] - 2025-10-29
### Added
- Nueva función X
- Soporte para opción Y

### Changed
- Mejorado rendimiento de Z

### Fixed
- Bug en caso A
- Crash cuando B

## [1.1.0] - 2025-10-28
[...]
```

### Ejemplos en package.json

Incluye una carpeta `examples/`:

```
mi-paquete/
├── examples/
│   ├── basic-usage.js
│   ├── advanced-usage.js
│   └── README.md
```

---

## 🚫 Deprecación y Unpublish

### Deprecar una Versión

Si publicas una versión con bugs graves:

```bash
npm deprecate mi-paquete@1.2.0 "Tiene un bug crítico, usa 1.2.1"
```

Los usuarios verán warnings al instalarlo:
```
npm WARN deprecated mi-paquete@1.2.0: Tiene un bug crítico, usa 1.2.1
```

### Unpublish (Eliminar Completamente)

**⚠️ EXTREMADAMENTE DESACONSEJADO**

Solo puedes unpublish dentro de las primeras 72 horas y si nadie lo ha instalado:

```bash
npm unpublish mi-paquete@1.0.0
```

**Por qué es malo**:
- Rompe proyectos que dependen de tu paquete
- Viola la confianza de la comunidad
- NPM puede banear tu cuenta por abuso

**Alternativa**: Depreca + publica versión corregida:
```bash
npm deprecate mi-paquete@1.0.0 "Obsoleto, usa >=1.1.0"
npm version minor
npm publish
```

---

## 🧘 Filosofía Estoica: El Acto de Dar sin Esperar Retorno

### La Generosidad como Virtud Central

Epicteto enseñaba: *"No es lo que tienes, sino cómo lo usas, lo que te hace rico"*. En el contexto de NPM, tu código tiene valor cuando lo **compartes**.

Publicar un paquete de código abierto es un acto de **generosidad radical**:

- No esperas pago
- No esperas reconocimiento
- No esperas agradecimiento
- Lo haces porque **beneficia al común**

### El Antídoto contra la Codicia

Recuerda el pecado de este pilar: **CODICIA**. La codicia se manifiesta como:

- "Este código es MÍO, nadie más puede usarlo"
- "Si lo publico, otros se aprovecharán de mi trabajo"
- "¿Por qué debería compartir mi ventaja competitiva?"

El estoico responde:

*"El conocimiento aumenta al compartirse, no disminuye. Al enseñar, aprendo. Al dar, recibo"*.

### Lecciones de los Grandes Contribuidores

**TJ Holowaychuk** (creador de Express, Koa, Commander, y 1000+ paquetes NPM):
*"Open source es compartir conocimiento. No escribo código solo para mí; lo escribo para la próxima persona que tenga el mismo problema"*.

**Sindre Sorhus** (creador de 1000+ paquetes, incluidos ky, got, ora):
*"Me gusta resolver problemas pequeños muy bien. Cada paquete es una pieza de educación para otros"*.

### Tus Responsabilidades como Maintainer

Publicar un paquete es solo el comienzo. La verdadera virtud está en **mantenerlo**:

1. **Responder issues** (aunque sean duplicados)
2. **Revisar pull requests** (aunque sean básicos)
3. **Actualizar dependencias** (aunque sea tedioso)
4. **Documentar cambios** (aunque nadie lo lea inmediatamente)
5. **Deprecar apropiadamente** (aunque quieras borrar y olvidar)

Esto es **deber estoico**: completar lo que has comenzado, con excelencia.

### Cuando No Puedes Mantener Más

La vida cambia. Prioridades cambian. Si ya no puedes mantener tu paquete:

1. **Sé honesto**: Añade nota en README: "Este paquete ya no se mantiene activamente"
2. **Transfiere ownership**: Encuentra a alguien dispuesto a mantenerlo
3. **Depreca apropiadamente**: Sugiere alternativas

Marco Aurelio: *"Acepta lo que no puedes cambiar"*. No mantengas un paquete por obligación culposa. Mejor comunicar claramente el estado.

---

## 📝 Ejercicios Prácticos

### Ejercicio 1: Publicar tu Primer Paquete

Crea y publica un paquete útil simple:

**Ideas**:
- Validador de RUT chileno
- Conversor de temperatura (Celsius ↔ Fahrenheit)
- Calculadora de IMC (Índice de Masa Corporal)
- Generador de slugs URL

**Requisitos**:
1. Package.json completo
2. README con ejemplos
3. Al menos 1 test
4. Publicado en NPM

### Ejercicio 2: Actualizar tu Paquete

Añade una nueva función a tu paquete:

1. Crear nueva función
2. Añadir tests
3. Actualizar README
4. Actualizar CHANGELOG
5. Incrementar versión (`npm version minor`)
6. Publicar (`npm publish`)

### Ejercicio 3: Crear Scoped Package Privado

Si tienes NPM Pro ($7/mes) o trabajas en una empresa con plan Teams:

```bash
npm init --scope=@tu-organizacion
# Hacer privado
npm publish --access restricted
```

Luego, en otro proyecto:
```bash
npm install @tu-organizacion/mi-paquete-privado
```

---

## 🎯 Checklist de Dominio

Antes de considerar completado este minicurso, asegúrate de:

- [ ] Tener cuenta activa en npmjs.com
- [ ] Entender todos los campos importantes de package.json para publicación
- [ ] Saber diferencia entre `.gitignore` y `.npmignore`
- [ ] Publicar al menos un paquete en el registro público
- [ ] Actualizar un paquete existente correctamente (version + publish)
- [ ] Escribir README completo con ejemplos
- [ ] Mantener CHANGELOG con formato estándar
- [ ] Entender cuándo usar scoped packages
- [ ] Conocer cómo deprecar versiones problemáticas
- [ ] Aplicar la filosofía estoica de generosidad en tu código abierto

---

## 🔗 Recursos Adicionales

- [NPM Docs - Publishing Packages](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning 2.0.0](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Choose an Open Source License](https://choosealicense.com/)
- [Open Source Guides](https://opensource.guide/)
- Marco Aurelio: *Meditaciones*, Libro VII, §22 (sobre generosidad)
- Epicteto: *Enquiridión*, §24 (sobre desprendimiento)

---

## 🌟 Reflexión Final: El Círculo Virtuoso

Has completado el Pilar 2: NPM. Has recorrido el camino completo:

1. **Consumir**: Aprendiste a instalar y usar paquetes
2. **Gestionar**: Dominaste dependencias, seguridad, y optimización
3. **Contribuir**: Ahora sabes publicar y compartir tu código

Este es el **círculo virtuoso del open source**:

```
Aprender → Usar → Crear → Compartir → Otros aprenden → ...
```

Has vencido la **CODICIA** (el pecado de este pilar) al entender que:

- El conocimiento no se agota al compartirse
- La comunidad te ha dado gratuitamente; ahora tú das
- Tu código tiene más valor cuando otros pueden usarlo
- El reconocimiento vendrá, pero no debe ser tu motivación

Como enseñaba Séneca: *"Quien recibe un beneficio con gratitud, paga la primera cuota de su deuda"*. Has recibido miles de paquetes NPM gratis. Ahora, al publicar tu propio código, empiezas a pagar esa deuda al común.

Pero más importante, has aprendido que **programar no es un acto solitario**. Estás parado sobre los hombros de gigantes: TJ Holowaychuk, Sindre Sorhus, Isaac Z. Schlueter (creador de NPM), y miles de maintainers anónimos que escriben código que tú usas a diario.

**Tu responsabilidad estoica**: Continuar ese legado. No solo uses NPM; contribuye a él. Reporta bugs, escribe documentación, mejora paquetes existentes, y cuando tengas algo valioso, publícalo sin miedo.

El mundo del software es mejor cuando compartimos generosamente.

¡La codicia ha sido vencida. La generosidad ha triunfado! 🌻

---

**Pilar completado**: 2/7 - NPM (Yellow - Overcoming Greed)  
**Próximo pilar**: Built-in Modules (Red - Overcoming Pride)  
**Preparación recomendada**: Publica al menos un paquete pequeño antes de continuar
