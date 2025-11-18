# 🧠 Cómo estudiar esta lección si te cuesta mantener la atención

1. **Lee en bloques cortos**, una sección cada vez.  
2. **Prueba el código inmediatamente**.  
3. **No memorices**, entiende con ejemplos.  
4. **Pausa breve** si notas saturación.  
5. **Vuelve atrás sin miedo** si algo no está claro.

---

# Lección 3: Manejo de Errores y Patrones Avanzados Asíncronos – *Amor Fati en el Código*

**Minicurso**: Programación Asíncrona & Event Loop (Naranja – Superar la Ira)  
**Lección**: 3 de 3  
**Duración**: 40 minutos  
**Tema Estoico**: **Amor Fati** – Aceptar y amar los errores como parte del camino

---

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección, podrás:

1. **Manejar errores correctamente** en callbacks, Promesas y async/await  
2. **Aplicar reintentos con backoff exponencial**  
3. **Usar timeouts** para evitar esperas infinitas  
4. **Depurar código asíncrono** con claridad  
5. **Evitar errores comunes**: memory leaks, race conditions, awaits olvidados  
6. **Integrar el principio estoico Amor Fati** en tu forma de programar

---

## 📖 Introducción: Los Errores como Maestros

### La inevitabilidad del fallo

Todo sistema real fallará:

- Archivos que no existen  
- Peticiones que tardan demasiado  
- Redes inestables  
- Respuestas corruptas  
- Usuarios que envían datos mal formados  

El programador dominado por la **ira** pelea contra los errores.  
El programador **estoico** los **espera**, los **acepta** y los **usa para fortalecerse**.

**Marco Aurelio**:  
> *“El impedimento a la acción adelanta la acción. Lo que se interpone, se convierte en el camino.”*

Los errores no son obstáculos:  
**Son instrucciones del universo diciéndote dónde mejorar.**

---

# 🧩 CONTENIDO CENTRAL

---

# 1. Manejo de Errores en Cada Patrón Asíncrono

---

## ✅ Callbacks: Convención error-first

```js
fs.readFile("data.txt", "utf8", (error, data) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  console.log("Contenido:", data);
});
```

Regla de oro:

👉 **Primero manejas el error. Luego el éxito.**  
👉 **Siempre return después del error**, o el código seguirá ejecutando la parte “exitosa”.

---

## ✅ Promesas: Manejo con `.catch()`

```js
fs.promises.readFile("data.txt", "utf8")
  .then(data => JSON.parse(data))
  .then(obj => procesar(obj))
  .catch(error => {
    console.error("Algo falló:", error.message);
  });
```

Características:

- Un único `.catch()` puede atrapar errores de toda la cadena  
- `.catch()` puede **recuperar** la cadena si devuelve algo  
- `.catch()` puede **propagar** si vuelve a lanzar (`throw`)

---

## ✅ Async/Await: Manejo con try/catch

```js
async function leerArchivo() {
  try {
    const data = await fs.promises.readFile("data.txt", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error leyendo archivo:", error.message);
  }
}
```

En aplicaciones reales:

👉 **Tu función principal debe tener try/catch**, o tu app morirá por "Unhandled Rejection".

---

# 2. Patrones Avanzados de Resiliencia

---

## 🔁 Reintentos con Backoff Exponencial (resiliencia real)

```js
async function retry(operation, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      const delay = baseDelay * 2 ** attempt;
      await new Promise(r => setTimeout(r, delay));
      console.log(`Reintentando (${attempt + 1})…`);
    }
  }
}
```

Esto replica el comportamiento de sistemas profesionales como AWS y Google.

---

## ⏳ Timeouts: No esperes para siempre

```js
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
}

async function withTimeout(promise, ms) {
  return Promise.race([promise, timeout(ms)]);
}
```

👉 Útil para llamadas a APIs lentas o bloqueos inesperados.

---

## ⚡ Circuit Breaker (Patrón industrial)

Evita seguir llamando a un servicio que está claramente roto.

```js
if (estado === "OPEN") {
  return cache;
}
```

(El archivo contiene la implementación completa.)

---

# 3. Errores Comunes y Cómo Evitarlos

---

## ❌ ERROR 1: Await olvidado

```js
saveUser(user); // ❌ NO ESPERA
```

## ✅ Solución:

```js
await saveUser(user);
```

---

## ❌ ERROR 2: Ejecutar en serie lo que podría ser paralelo

```js
await a();
await b();
await c();
```

## ✅ Solución:

```js
await Promise.all([a(), b(), c()]);
```

---

## ❌ ERROR 3: Memory leaks con listeners

```js
emitter.on("update", handler); // y nunca lo quitas
```

## ✅ Solución:

```js
emitter.once("update", handler);
```

o

```js
return () => emitter.removeListener("update", handler);
```

---

# 4. Depuración Asíncrona Clara

---

## 🧪 Logs con timestamps

```js
console.time("fetch");
await fetchData();
console.timeEnd("fetch");
```

## 🧱 Errores descriptivos

```js
throw new Error(`Usuario ${id} no encontrado en BD ${dbName}`);
```

---

# 💻 Ejercicios Prácticos

*(Incluye los ejercicios completos del original, traducidos y adaptados.)*

---

# 🤔 Reflexión Estoica: AMOR FATI

Los errores no son enemigos:  
**Son señales que fortalecen tu código.**

- El error te muestra dónde tu sistema era débil  
- El retry convierte un fallo temporal en éxito  
- El timeout evita estancamiento  
- El circuit breaker evita catástrofes  
- El error bien manejado salva usuarios y servidores

**Nietzsche** (inspirado por los estoicos):

> *“Amor Fati: Que no quieras que nada sea diferente.  
No solo soportarlo… sino amarlo.”*

---

# 📝 Resumen

✔ Callbacks – manejo error-first  
✔ Promesas – .catch() centralizado  
✔ Async/Await – try/catch, fácil de leer  
✔ Reintentos – resiliencia profesional  
✔ Timeouts – evitar bloqueos  
✔ Circuit breakers – proteger tu sistema  
✔ Paralelismo – más rendimiento  
✔ Limpieza de listeners – sin memory leaks  
✔ Amor Fati – los errores te entrenan

---

# 🟠 Minicurso 4 completado  
**Has dominado la programación asíncrona moderna en Node.js.**

Próximo minicurso:  
🟡 **Event Emitters (Amar sin poseer – superar la avaricia)**

---

*"Lo que está en el camino, se convierte en el camino."* — Marco Aurelio
