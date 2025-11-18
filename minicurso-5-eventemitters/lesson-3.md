# Lección 3: Manejo avanzado de eventos
# 🧠 Cómo estudiar esta lección
1. Revisa cómo se comportan múltiples listeners.
2. Usa ejemplos con once(), error y eventos personalizados.

## Errores en EventEmitter
EventEmitter tiene un evento especial: "error".

```js
const { EventEmitter } = require("events");
const em = new EventEmitter();

em.on("error", (err) => console.error("Error capturado:", err));

em.emit("error", new Error("Fallo interno"));
```

## Eventos personalizados
Puedes crear tus propios eventos y flujos asíncronos.

## Ejercicio final
Combina varios emisores para simular un sistema de notificaciones.
