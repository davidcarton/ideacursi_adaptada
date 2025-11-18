# 🧠 Cómo estudiar esta lección si tienes TDAH

1. **Lee por bloques**: cada sección es corta y autónoma.
2. **Ejecuta el código al momento** (no esperes al final).
3. **No memorices**, entiende el flujo del Event Loop con ejemplos.
4. **Respira 10 segundos** al acabar cada sección para integrar.
5. **Si algo no se entiende**, vuelve un paso atrás sin culpa.

---

# Lección 1: Fundamentos del Event Loop – El Arte de la Observación Paciente

**Minicurso**: Programación Asíncrona & Event Loop (Naranja – Superar la Ira)  
**Lección**: 1 de 3  
**Duración**: 35–40 minutos  
**Tema Estoico**: Paciencia – Aceptar que no controlas _cuándo_ ocurren las cosas, solo _cómo respondes_

---

# 🎯 Objetivos de la Lección

Cuando termines serás capaz de:

- Entender qué es el **Event Loop** y por qué Node.js lo usa.
- Visualizar cómo fluye el código entre **call stack**, **microtasks** y **callbacks**.
- Predecir el **orden real** de ejecución en código mixto (sync + async).
- Diferenciar los tipos de tareas: timers, I/O, microtareas, etc.
- Aplicar el principio estoico de **paciencia & aceptación** al código asíncrono.

---

# 📖 Introducción — La Impaciencia del Programador

Imagina poner agua a hervir.

No importa cuántas veces mires la olla:  
**no va a hervir antes.**

En programación pasa igual.

- Una lectura de archivo tarda lo que tarda.
- Una petición HTTP tarda lo que tarda.
- Un temporizador se ejecuta cuando se ejecuta.

Forzar estos tiempos o intentar “sincronizarlos” genera frustración (ira).

Marcus Aurelius lo resumió perfectamente:

> _“Tienes poder sobre tu mente, no sobre los eventos externos.”_

Node.js vive exactamente con esa filosofía:  
**no puede controlar cuándo termina una operación… pero sí cómo responder cuando termina.**

Ese mecanismo es el **Event Loop**.

---

# 🧩 1. ¿Qué es el Event Loop?

Es el sistema que decide **qué código se ejecuta y cuándo**, permitiendo que JavaScript (que es de un único hilo) pueda manejar tareas que tardan.

Idea clave:

> **JavaScript ejecuta una cosa a la vez.  
> Pero el Event Loop permite esperar sin bloquear.**

El Event Loop revisa continuamente:

1. ¿Hay código síncrono? → ejecútalo.
2. ¿Hay microtareas pendientes? → ejecútalas.
3. ¿Hay callbacks listos? → ejecútalos.
4. Si no hay nada → espera pacientemente.

---

# 🧱 2. Las Tres Zonas Importantes

## 🟦 A) Call Stack (Pila de llamadas)

Es donde **se ejecuta el código de verdad**.

Funciona como una torre de platos:

- Entra una función → arriba del todo.
- Termina → se retira.

Ejemplo:

```js
function a() {
  console.log("A");
  b();
}
function b() {
  console.log("B");
}
a();

// A
// B
```

Todo corre en ese orden, sin interrupciones.

---

## 🟧 B) Callback Queue (Cola de tareas)

Aquí van cosas como:

- `setTimeout`
- operaciones de I/O (fs, red, etc.)
- eventos externos

Estas tareas **esperan turno** hasta que el call stack se vacía.

---

## 🟪 C) Microtask Queue (Micotareas)

Aquí van:

- `.then()` de Promesas
- `queueMicrotask`

Y tiene **más prioridad** que la Callback Queue.

**IMPORTANTE:**  
Siempre se ejecutan _antes_ que los timers, incluso si el timer tiene 0 ms.

---

# 🚦 3. Orden Real de Ejecución

Míralo así:

1. Código síncrono
2. Microtareas (Promesas)
3. Callbacks normales (timeouts, I/O)

Ejemplo:

```js
console.log("Inicio");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promesa"));

console.log("Fin");
```

Resultado:

```
Inicio
Fin
Promesa
Timeout
```

✨ _Esto es una de las claves para dominar JS._

---

# 🔍 4. Visualización Completa (rápida)

```
CALL STACK →
    Ejecuta código síncrono

MICROTASK QUEUE →
    Ejecuta todas las promesas pendientes (todas)

CALLBACK QUEUE →
    Ejecuta timers, I/O, etc.

→ Vuelve al inicio
```

Este bucle se repite **miles de veces por segundo**.

---

# 🛠️ 5. Ejemplo Completo para Entender el Orden

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));

console.log("E");
```

Salida real:

```
A
E
C
D
B
```

Por qué:

1. A y E → síncrono
2. C y D → microtareas
3. B → callback

---

# ⏱️ 6. Mini‑resumen para TDAH (Ultra‑rápido)

- JavaScript ejecuta una cosa a la vez → **Call Stack**
- Las Promesas tienen sala VIP → **Microtasks**
- Los `setTimeout` esperan cola → **Callbacks**
- Orden siempre:  
  **Sync → Microtasks → Callbacks**

Si recuerdas esto → ya entiendes el Event Loop al 80%.

---

# 💻 Ejercicios Prácticos

## 🧪 Ejercicio 1 — Predice el Resultado

```js
console.log("1");

setTimeout(() => {
  console.log("2");
  Promise.resolve().then(() => console.log("3"));
}, 0);

Promise.resolve().then(() => {
  console.log("4");
  setTimeout(() => console.log("5"), 0);
});

setTimeout(() => console.log("6"), 0);

Promise.resolve().then(() => console.log("7"));

console.log("8");
```

**Solución:**

```
1
8
4
7
2
3
6
5
```

---

## 🧪 Ejercicio 2 — Mini Task Scheduler

Te ayuda a interiorizar el orden del Event Loop.

```js
class TaskScheduler {
  addImmediate(name, fn) {
    console.log(`[Immediate] ${name}`);
    fn();
  }

  addMicrotask(name, fn) {
    console.log(`[Microtask Scheduled] ${name}`);
    Promise.resolve().then(() => {
      console.log(`[Microtask] ${name}`);
      fn();
    });
  }

  addCallback(name, fn) {
    console.log(`[Callback Scheduled] ${name}`);
    setTimeout(() => {
      console.log(`[Callback] ${name}`);
      fn();
    }, 0);
  }

  addCheck(name, fn) {
    console.log(`[Check Scheduled] ${name}`);
    setImmediate(() => {
      console.log(`[Check] ${name}`);
      fn();
    });
  }
}

const t = new TaskScheduler();

t.addImmediate("A", () => console.log("A ejecutado"));
t.addMicrotask("B", () => console.log("B ejecutado"));
t.addCallback("C", () => console.log("C ejecutado"));
t.addCheck("D", () => console.log("D ejecutado"));
```

---

# 🧠 Reflexión Estoica – Paciencia en el Código

El Event Loop enseña una verdad profunda:

> **No puedes hacer que algo termine antes.  
> Pero sí puedes decidir cómo reaccionar cuando lo haga.**

Esto es programación asíncrona.  
Esto es estoicismo aplicado.

---

# 📝 Resumen Final

- JavaScript ejecuta **una cosa a la vez**.
- El Event Loop decide _cuándo_ ejecutar lo demás.
- Prioridad:  
  **Síncrono → Microtasks → Callbacks**
- No bloquees, no fuerces tiempos.
- Estructura tu código para **responder**, no para **exigir**.

---

# 👉 Próxima Lección

**Lección 2: Callbacks, Promesas y Async/Await – La Evolución de la Confianza**
