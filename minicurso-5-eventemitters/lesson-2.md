# Lección 2: Patrón Pub/Sub en profundidad
# 🧠 Cómo estudiar esta lección
1. Visualiza qué partes publican y cuáles escuchan.
2. Repite los ejemplos hasta comprender el flujo.

## Patrón Publish/Subscribe
Permite que diferentes partes de una aplicación se comuniquen sin depender entre sí.

```js
const EventEmitter = require("events");
const bus = new EventEmitter();

bus.on("msg", (data) => console.log("Mensaje:", data));
bus.emit("msg", "Hola mundo");
```

## Ventajas
- Bajo acoplamiento
- Escalabilidad
- Modularidad

## Ejercicio
Implementa un sistema de logs usando pub/sub.
