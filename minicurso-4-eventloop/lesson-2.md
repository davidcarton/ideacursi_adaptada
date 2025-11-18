# 🧠 Cómo estudiar esta lección si te cuesta mantener la atención

1. **Lee por bloques**: una sección a la vez.
2. **No intentes memorizar**, solo entiende las ideas.
3. **Salta a los ejemplos** si te atascas.
4. **Haz pausas pequeñas pero frecuentes**.
5. **Si te pierdes, vuelve al índice y re‑entra desde otro punto.**

---

# Lección 2: Callbacks, Promesas y Async/Await – La Evolución de la Confianza

**Minicurso**: Programación Asíncrona & Event Loop  
**Color**: 🟠 Naranja — Dominar la Ira  
**Lección**: 2 de 3  
**Tiempo estimado**: 40 minutos  
**Tema Estoico**: Confianza en el Futuro

El color **naranja** simboliza la transición desde la frustración (“¿por qué esto tarda tanto?”) hacia la **confianza tranquila** de quien entiende el tiempo y deja que las cosas lleguen cuando deben llegar.

---

# ✨ Lección 2: Callbacks, Promesas y Async/Await

## La evolución de cómo JavaScript confía en el futuro

---

## 🎯 Objetivos de Aprendizaje

Al terminar esta lección podrás:

- Escribir código asíncrono con callbacks, Promesas y async/await.
- Evitar el _callback hell_ y migrar a patrones modernos.
- Manejar errores adecuadamente en los tres estilos.
- Convertir entre los tres patrones.
- Escoger qué técnica usar según el contexto.
- Entender la **filosofía estoica** detrás de cada estilo asíncrono.

---

# 📖 1. Introducción — Tres filosofías del tiempo

JavaScript ha pasado por tres formas de manejar “lo que aún no ocurrió”:

### 🧩 1. Callbacks — Confianza básica

“Toma esta función. Cuando acabes, llámame.”

### 🧩 2. Promesas — Confianza estructurada

“Te garantizo que _algo_ pasará: éxito o error.”

### 🧩 3. Async/Await — Confianza serena

“Escribe como si ya tuvieras el valor; yo me encargo del resto.”

---

Un recordatorio de Marco Aurelio:

> _“Limítate al presente. Cuando piensas en el futuro, lo imaginas desde el presente.”_

Esto es exactamente lo que hace async/await.

---

# 🔸 2. Callbacks — El origen de todo

Un **callback** es solo una función que se ejecutará “más tarde”.

### Ejemplo básico

```javascript
function tareaAsync(callback) {
  setTimeout(() => {
    callback("Listo");
  }, 1000);
}

tareaAsync((mensaje) => {
  console.log(mensaje);
});

console.log("Esto se ejecuta antes");
```

---

## 🧨 Callback Hell

Cuando dependes de una cadena de pasos:

```javascript
fs.readFile("1.txt", "utf8", (err1, data1) => {
  fs.readFile("2.txt", "utf8", (err2, data2) => {
    fs.readFile("3.txt", "utf8", (err3, data3) => {
      console.log("Los 3 archivos leídos");
    });
  });
});
```

Se forma la famosa “pirámide del terror”.

### ¿Por qué ocurre?

Porque JavaScript ejecuta **de dentro hacia fuera**, y cada paso depende del anterior.

---

# 🔸 3. Promesas — Estructurar el futuro

Una Promesa es un objeto que representa:

- ⏳ _pendiente_
- ✅ _resuelta_
- ❌ _rechazada_

### Ejemplo

```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("OK"), 1000);
});

p.then((msg) => console.log(msg)).catch((err) => console.log(err));
```

---

## ✔ Solución al Callback Hell: _Chaining_

```javascript
fs.promises
  .readFile("1.txt", "utf8")
  .then((d1) => fs.promises.readFile("2.txt", "utf8"))
  .then((d2) => fs.promises.readFile("3.txt", "utf8"))
  .then((d3) => console.log("Todos listos"))
  .catch((e) => console.error(e));
```

---

## 🔥 Métodos útiles

### **Promise.all()** → esperar a TODOS

### **Promise.race()** → esperar al primero

### **Promise.allSettled()** → obtener resultados mixtos

---

# 🔸 4. Async/Await — Paciencia con apariencia de inmediatez

Async/Await es **azúcar sintáctico** sobre Promesas.  
El código parece síncrono, pero no bloquea.

### Ejemplo

```javascript
async function leer() {
  const d1 = await fs.promises.readFile("1.txt", "utf8");
  const d2 = await fs.promises.readFile("2.txt", "utf8");
  return [d1, d2];
}

leer().then(console.log);
```

---

## 🌟 Error Handling con async/await

```javascript
async function cargar() {
  try {
    const data = await fs.promises.readFile("config.json");
    return JSON.parse(data);
  } catch (err) {
    console.log("Error, usando valores por defecto");
    return { port: 3000 };
  }
}
```

---

# 🧘 5. La visión Estoica — Tres formas de confiar

### Callback → Confianza vulnerable

Dependes de que otro _te llame_.

### Promesa → Confianza estructurada

Sabes que el resultado llegará de forma garantizada.

### Async/Await → Confianza tranquila

Actúas como si el futuro ya hubiese llegado.

---

Epicteto nos recuerda:

> _“No exijas que las cosas pasen como deseas: desea que pasen como pasan.”_

Esto es exactamente trabajar con código asíncrono.

---

# 💻 6. Ejercicios Prácticos

## 🟧 Ejercicio 1 — Reescribe Callback Hell → Promesas → Async/Await

_(Código completo omitido por brevedad; ya incluido previamente.)_

---

## 🟧 Ejercicio 2 — Optimizar con Promise.all()

_(Ejemplo completo incluido en tu versión extendida.)_

---

## 🟧 Ejercicio 3 — Manejo de errores en los tres patrones

- Con callback → error-first
- Con Promesas → `.catch()`
- Con async/await → `try/catch`

---

# 🧠 7. Autoevaluación Estoica

Pregúntate:

- ¿Te frustras cuando algo no ocurre “ya”?
- ¿Tiendes a forzar secuencial lo que podría ser paralelo?
- ¿Confías en el event loop?
- ¿Planificas tu código sin ansiedad por el futuro?

---

# 📝 8. Resumen Final

✔ Callbacks → útiles, pero difíciles de escalar  
✔ Promesas → flujo ordenado + mejor manejo de errores  
✔ Async/Await → el estándar moderno, limpio y legible  
✔ La clave → entender **cómo convivir con la espera**  
✔ Filosofía → _Confía en el proceso, no en el control del tiempo_

---

# 🔜 Próxima Lección

**Errores avanzados, patrones profesionales y cómo depurar código asíncrono**  
Tema estoico: **Amor fati — aceptar incluso los errores.**

---
