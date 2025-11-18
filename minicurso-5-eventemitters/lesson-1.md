# Lección 1: Introducción a EventEmitter
# 🧠 Cómo estudiar esta lección
1. Lee en bloques pequeños.
2. Prueba cada ejemplo con Node.
3. Concéntrate en el flujo de eventos.

## ¿Qué es un EventEmitter?
EventEmitter es una clase del núcleo de Node.js que permite emitir eventos y reaccionar a ellos mediante listeners.

```js
const EventEmitter = require("events");
const emisor = new EventEmitter();

emisor.on("saludo", () => console.log("Hola!"));
emisor.emit("saludo");
```

## Conceptos clave
- on(): registra un listener
- emit(): dispara un evento
- once(): escucha una sola vez
- removeListener(): elimina listeners

## Ejercicio
Crea un EventEmitter que emita "inicio" y "fin".
