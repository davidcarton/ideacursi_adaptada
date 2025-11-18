# 🧠 Cómo estudiar esta lección si te cuesta mantener la atención

1. Lee por bloques pequeños.  
2. Prueba cada ejemplo en el REPL.  
3. Evita memorizar: experimenta.  
4. Haz pausas breves.  
5. Repite lo que no quede claro.  
6. Comprende el flujo paso a paso.

---
# Lección 3: Debugging con REPL

**Minicurso:** Pilar 1 - REPL (Violet - Overcoming Sloth)  
**Nivel:** Intermediate  
**Duración estimada:** 50 minutos  
**Filosofía Estoica:** La tranquilidad en medio del caos del código

---

## 🎯 Objetivos de Aprendizaje

Al completar esta lección, serás capaz de:

- Diagnosticar errores comunes usando el REPL como herramienta de debugging
- Inspeccionar objetos complejos y estructuras de datos profundas
- Verificar hipótesis sobre el comportamiento del código rápidamente
- Utilizar el REPL para aislar problemas en código más grande
- Probar soluciones potenciales antes de aplicarlas a tu proyecto
- Mantener la calma estoica frente a bugs complejos

---

## 📖 Introducción: El Arte Estoico del Debugging

Marco Aurelio escribió: *"La impedimenta se convierte en el camino"*. En programación, los bugs no son obstáculos frustrantes; son **maestros** que te obligan a entender tu código más profundamente.

El REPL es tu dojo de debugging. Es el lugar donde puedes:
- Descomponer problemas grandes en partes pequeñas
- Probar hipótesis inmediatamente
- Ver exactamente qué devuelve cada expresión
- Mantener la objetividad que un debugger complejo a veces oscurece

Los estoicos valoraban la **ataraxia**: tranquilidad mental frente a circunstancias adversas. Cuando tu código falla, el REPL te ayuda a mantener esa calma, proporcionándote un espacio seguro para experimentar sin consecuencias.

---

## 🔍 Estrategias Fundamentales de Debugging

### 1. Aislamiento Progresivo

Cuando un bloque grande de código falla, no sabes exactamente dónde está el problema. La estrategia es **aislar progresivamente** ejecutando cada línea en el REPL.

**Ejemplo: Código que falla**

```javascript
function procesarUsuarios(usuarios) {
  return usuarios
    .filter(u => u.edad >= 18)
    .map(u => ({ nombre: u.nombre.toUpperCase(), correo: u.email }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
}

const usuarios = [
  { nombre: "Alice", edad: 25, email: "alice@example.com" },
  { nombre: "Bob", edad: 17, email: "bob@example.com" },
  { nombre: "Carol", edad: 30, email: null }
];

const resultado = procesarUsuarios(usuarios); // Error!
```

**¿Dónde está el bug?** Usa el REPL para aislar:

```javascript
> const usuarios = [
...   { nombre: "Alice", edad: 25, email: "alice@example.com" },
...   { nombre: "Bob", edad: 17, email: "bob@example.com" },
...   { nombre: "Carol", edad: 30, email: null }
... ]
undefined

// Prueba paso 1: filter
> usuarios.filter(u => u.edad >= 18)
[
  { nombre: 'Alice', edad: 25, email: 'alice@example.com' },
  { nombre: 'Carol', edad: 30, email: null }
]

// Prueba paso 2: map
> _.map(u => ({ nombre: u.nombre.toUpperCase(), correo: u.email }))
[
  { nombre: 'ALICE', correo: 'alice@example.com' },
  { nombre: 'CAROL', correo: null }
]

// Prueba paso 3: sort
> _.sort((a, b) => a.nombre.localeCompare(b.nombre))
[
  { nombre: 'ALICE', correo: 'alice@example.com' },
  { nombre: 'CAROL', correo: null }
]
```

Todo funciona! Entonces, ¿por qué falla en el código original? Probablemente el problema está en otro lugar (tal vez `usuarios` es `undefined` en el contexto real, o hay un typo en el nombre de la función).

**Lección estoica**: No asumas dónde está el problema. **Verifica cada paso objetivamente**. Como dijo Epicteto: *"No son las cosas en sí las que nos perturban, sino nuestras opiniones sobre ellas"*. No es el código que falla; es tu asunción incorrecta sobre dónde está el fallo.

---

### 2. Inspección de Estado

A menudo los bugs ocurren porque el estado de tus datos no es lo que esperas. El REPL te permite inspeccionar ese estado con precisión quirúrgica.

**Técnicas de inspección**:

```javascript
// Verificar tipo
> const valor = obtenerAlgo()
> typeof valor
'object'

> Array.isArray(valor)
true

// Verificar contenido
> valor
[ 1, 2, 3, undefined, 5 ]

// ¡Ahá! Hay un undefined inesperado en posición 3

// Verificar longitud
> valor.length
5

// Verificar propiedades de objeto
> const config = { api: "https://api.example.com", timeout: 3000 }
> Object.keys(config)
[ 'api', 'timeout' ]

> Object.entries(config)
[
  [ 'api', 'https://api.example.com' ],
  [ 'timeout', 3000 ]
]

// Inspección profunda
> const objetoComplejo = { user: { profile: { settings: { theme: "dark" } } } }
> JSON.stringify(objetoComplejo, null, 2)
'{
  "user": {
    "profile": {
      "settings": {
        "theme": "dark"
      }
    }
  }
}'
```

**Uso de `console.dir()` para objetos complejos**:

```javascript
> const obj = {
...   nivel1: {
...     nivel2: {
...       nivel3: {
...         nivel4: {
...           dato: "muy profundo"
...         }
...       }
...     }
...   }
... }
undefined

> console.dir(obj, { depth: null })
{
  nivel1: {
    nivel2: {
      nivel3: {
        nivel4: { dato: 'muy profundo' }
      }
    }
  }
}
```

---

### 3. Verificación de Hipótesis

Cuando tienes una teoría sobre por qué algo falla, el REPL es perfecto para probar esa hipótesis **antes** de modificar tu código fuente.

**Ejemplo: Sospecha de problema con conversión de tipos**

```javascript
// Hipótesis: El string "123" no se compara correctamente con el número 123
> "123" === 123
false

> "123" == 123
true

// Hipótesis confirmada: necesitas conversión explícita o comparación laxa

// Prueba diferentes soluciones
> parseInt("123", 10) === 123
true

> Number("123") === 123
true

> +"123" === 123
true
```

**Ejemplo: Verificando comportamiento de métodos**

```javascript
// ¿map() modifica el array original?
> const original = [1, 2, 3]
> const modificado = original.map(x => x * 2)
> original
[ 1, 2, 3 ]
// Hipótesis confirmada: map() no muta el original

// ¿Y sort()?
> const nums = [3, 1, 2]
> nums.sort()
> nums
[ 1, 2, 3 ]
// ¡Cuidado! sort() SÍ muta el array original
```

---

### 4. Simulación de Entorno

Cuando tu código depende de datos externos (APIs, archivos, etc.), puedes simular esos datos en el REPL para aislar el problema.

**Ejemplo: Simulando respuesta de API**

```javascript
// Tu función que procesa datos de API
> function procesarRespuesta(data) {
...   return data.usuarios.map(u => u.nombre);
... }
undefined

// Simula la respuesta de la API
> const respuestaSimulada = {
...   usuarios: [
...     { id: 1, nombre: "Alice" },
...     { id: 2, nombre: "Bob" }
...   ],
...   timestamp: "2025-10-29T12:00:00Z"
... }
undefined

> procesarRespuesta(respuestaSimulada)
[ 'Alice', 'Bob' ]

// Ahora prueba con datos malformados
> const respuestaMala = { usuarios: null }
> procesarRespuesta(respuestaMala)
TypeError: Cannot read property 'map' of null
// ¡Encontraste el problema! Necesitas validación de null
```

---

## 🐛 Debugging de Errores Comunes

### Error 1: TypeError - Cannot Read Property

**Código con error**:

```javascript
function obtenerNombreCompleto(persona) {
  return persona.nombre + " " + persona.apellido;
}
```

**Debugging en REPL**:

```javascript
> function obtenerNombreCompleto(persona) {
...   return persona.nombre + " " + persona.apellido;
... }
undefined

// Caso que funciona
> obtenerNombreCompleto({ nombre: "Alice", apellido: "Smith" })
'Alice Smith'

// Caso que falla
> obtenerNombreCompleto(null)
TypeError: Cannot read properties of null (reading 'nombre')

// Prueba soluciones
> function obtenerNombreCompletoSeguro(persona) {
...   if (!persona) return "Desconocido";
...   return persona.nombre + " " + persona.apellido;
... }
> obtenerNombreCompletoSeguro(null)
'Desconocido'

// O usa optional chaining (Node 14+)
> function obtenerNombreCompletoModerno(persona) {
...   return `${persona?.nombre || 'N/A'} ${persona?.apellido || 'N/A'}`;
... }
> obtenerNombreCompletoModerno(null)
'N/A N/A'
```

---

### Error 2: ReferenceError - Variable Not Defined

**Debugging**:

```javascript
> function calcular() {
...   return resultado * 2;
... }
> calcular()
ReferenceError: resultado is not defined

// Solución 1: Define la variable
> let resultado = 10
> calcular()
20

// Solución 2: Pasa como parámetro
> function calcularCorrectamente(resultado) {
...   return resultado * 2;
... }
> calcularCorrectamente(10)
20
```

---

### Error 3: Problemas con Asincronía

El REPL es excelente para entender código asíncrono:

```javascript
> function obtenerDatos() {
...   return new Promise(resolve => {
...     setTimeout(() => resolve("Datos"), 1000);
...   });
... }
undefined

// ❌ Esto no funciona como esperas
> const datos = obtenerDatos()
> datos
Promise { <pending> }

// ✅ Solución 1: .then()
> obtenerDatos().then(datos => console.log(datos))
Promise { <pending> }
> Datos  // Aparece después de 1 segundo

// ✅ Solución 2: await en función async
> async function prueba() {
...   const datos = await obtenerDatos();
...   console.log(datos);
... }
> prueba()
Promise { <pending> }
> Datos  // Aparece después de 1 segundo

// ✅ Solución 3: top-level await (Node 14.8+)
> await obtenerDatos()
// Espera 1 segundo...
'Datos'
```

---

## 🧪 Técnicas Avanzadas de Debugging

### Crear Mocks de Funciones

```javascript
// Función original que hace llamada HTTP
> function guardarEnBaseDatos(usuario) {
...   // Código complejo que no quieres ejecutar durante debugging
...   return http.post('/api/usuarios', usuario);
... }

// Mock para testing
> function guardarEnBaseDatosMock(usuario) {
...   console.log("Mock: guardaría", usuario);
...   return Promise.resolve({ id: 123, ...usuario });
... }

> guardarEnBaseDatosMock({ nombre: "Test" })
Mock: guardaría { nombre: 'Test' }
Promise { { id: 123, nombre: 'Test' } }
```

### Benchmarking de Performance

```javascript
> function lento() {
...   let sum = 0;
...   for (let i = 0; i < 1000000; i++) sum += i;
...   return sum;
... }

> function rapido() {
...   const n = 999999;
...   return (n * (n + 1)) / 2;
... }

// Medir tiempo
> console.time("lento"); lento(); console.timeEnd("lento")
499999500000
lento: 2.541ms

> console.time("rapido"); rapido(); console.timeEnd("rapido")
499999500000
rapido: 0.015ms

// ¡La versión optimizada es 169x más rápida!
```

### Debugging de Closures y Scope

Los problemas de scope son comunes. El REPL te ayuda a visualizarlos:

```javascript
> function crearContador() {
...   let count = 0;
...   return {
...     incrementar: () => ++count,
...     obtener: () => count
...   };
... }

> const contador1 = crearContador()
> const contador2 = crearContador()

> contador1.incrementar()
1
> contador1.incrementar()
2
> contador2.incrementar()
1

// Verificar que cada instancia tiene su propio closure
> contador1.obtener()
2
> contador2.obtener()
1

// ¡Cada contador mantiene su propio estado!
```

---

## 🏛️ Debugging Estoico: Principios

### 1. Objetividad Radical

Epicteto enseñaba: *"Las cosas son lo que son, no lo que piensas que son"*. En debugging, esto significa: **no asumas nada, verifica todo**.

```javascript
// ❌ Asumir
// "Estoy seguro de que esto devuelve un array"

// ✅ Verificar
> const resultado = miFuncion()
> Array.isArray(resultado)
> typeof resultado
> resultado.length
```

### 2. Aceptación del Error

Marco Aurelio: *"El impedimento a la acción avanza la acción. Lo que se interpone en el camino se convierte en el camino"*.

Cada bug es una oportunidad de aprender cómo funciona realmente JavaScript, no cómo crees que funciona. Acepta el error como maestro, no como enemigo.

### 3. Paciencia Metódica

Séneca: *"El tiempo descubre la verdad"*. No intentes adivinar el bug con rapidez. Usa el REPL para probar **cada hipótesis metódicamente**, una por una.

**Workflow de debugging estoico**:

1. **Observa**: ¿Qué esperabas? ¿Qué obtuviste?
2. **Aísla**: Reproduce el error en el REPL con el mínimo código posible
3. **Hipótesis**: Genera teorías sobre la causa
4. **Prueba**: Verifica cada hipótesis en el REPL
5. **Corrige**: Aplica la solución
6. **Aprende**: Documenta lo aprendido para evitar el error futuro

---

## 📝 Ejercicios Prácticos

### Ejercicio 1: Debugging de Array Methods

Este código debería filtrar números pares y luego multiplicarlos por 2, pero algo falla:

```javascript
const numeros = [1, 2, 3, 4, 5, 6];

function procesarNumeros(arr) {
  return arr
    .filter(n => n % 2)
    .map(n => n * 2);
}

procesarNumeros(numeros); // Resultado esperado: [4, 8, 12]
```

Usa el REPL para:
1. Reproducir el error
2. Probar el filter aisladamente
3. Identificar el problema
4. Probar la solución
5. Verificar que funciona

**Pista**: El problema está en la expresión del filter.

---

### Ejercicio 2: Debugging de Async Code

Esta función debería esperar 1 segundo y luego retornar un mensaje, pero no funciona como esperado:

```javascript
function esperarYSaludar(nombre) {
  setTimeout(() => {
    return `Hola, ${nombre}!`;
  }, 1000);
}

const mensaje = esperarYSaludar("Alice");
console.log(mensaje); // undefined ¿por qué?
```

Usa el REPL para:
1. Entender por qué retorna `undefined`
2. Convertir la función para usar Promises
3. Convertir la función para usar async/await
4. Probar ambas versiones en el REPL

---

### Ejercicio 3: Debugging de Object Mutation

Este código debería crear una copia de un objeto y modificar solo la copia, pero modifica ambos:

```javascript
const original = { nombre: "Alice", edad: 25, hobbies: ["leer", "correr"] };
const copia = original;
copia.edad = 30;
copia.hobbies.push("nadar");

console.log(original.edad); // 30 ¿Por qué cambió?
console.log(original.hobbies); // ["leer", "correr", "nadar"] ¿Por qué?
```

Usa el REPL para:
1. Reproducir el problema
2. Entender la diferencia entre referencia y copia
3. Probar diferentes métodos de copia: `Object.assign()`, spread operator, `JSON.parse(JSON.stringify())`
4. Identificar cuál método hace copia profunda y cuál superficial

---

## 🎯 Checklist de Dominio

Antes de considerar esta lección completada, asegúrate de:

- [ ] Poder aislar problemas en código complejo ejecutando líneas individuales en el REPL
- [ ] Usar `console.dir()` con opciones para inspeccionar objetos profundos
- [ ] Verificar hipótesis sobre comportamiento del código antes de modificar archivos
- [ ] Simular datos externos en el REPL para testing aislado
- [ ] Debuggear errores comunes: TypeError, ReferenceError, problemas de async
- [ ] Crear mocks simples de funciones para testing
- [ ] Usar `console.time()` para benchmarking básico
- [ ] Aplicar el workflow estoico de debugging: observar, aislar, hipótesis, probar, corregir, aprender

---

## 🌟 Reflexión Final

El debugging no es encontrar errores en el código; es **encontrar errores en tu comprensión del código**. Cada bug revela una brecha entre cómo crees que funciona JavaScript y cómo realmente funciona.

El REPL es tu laboratorio personal donde puedes cerrar esas brechas, una expresión a la vez. Es un espacio donde el fracaso no tiene costo, donde la experimentación es bienvenida, donde la curiosidad es recompensada con comprensión.

Marco Aurelio escribió: *"La calidad de tu vida está determinada por la calidad de tus pensamientos"*. En programación, parafraseamos: **la calidad de tu código está determinada por la calidad de tu debugging**. Y el debugging de calidad requiere:

- **Paciencia**: Probar hipótesis metódicamente
- **Objetividad**: No asumir, verificar
- **Humildad**: Aceptar que no entiendes todo
- **Curiosidad**: Explorar hasta comprender profundamente

Has completado el Pilar 1: REPL. Has vencido la pereza del inicio, dominado la eficiencia de los comandos, y cultivado la tranquilidad en el debugging. Estos no son solo skills técnicos; son **virtudes** que llevarás a todo tu trabajo como desarrollador.

Como último ejercicio estoico, reflexiona sobre este proverbio de Séneca: *"No es porque las cosas son difíciles que no nos atrevemos; es porque no nos atrevemos que son difíciles"*. El REPL elimina todas las excusas para no atreverte. No hay setup, no hay configuración, no hay fricción. Solo tú y el código.

**Úsalo todos los días. Conviértelo en tu primer recurso, no en tu último. Y observa cómo tu maestría crece.**

¡La pereza ha sido vencida. La eficiencia ha sido dominada. La tranquilidad ha sido cultivada! 🎉

---

**Curso completado**: Pilar 1 - REPL (Violet - Overcoming Sloth)  
**Próximo pilar**: NPM (Orange - Overcoming Greed)  
**Práctica recomendada**: Dedica una semana completa usando el REPL diariamente antes de avanzar al siguiente pilar
