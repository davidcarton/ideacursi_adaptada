# Lección 1: Introducción a Streams
# 🧠 Cómo estudiar esta lección
1. Lee poco a poco.
2. Prueba ejemplos con fs.createReadStream.
3. Visualiza el flujo de datos.

## ¿Qué es un Stream?
Un Stream es una fuente o destino de datos que fluye en trozos (chunks).

Ejemplo:
```js
const fs = require("fs");
const stream = fs.createReadStream("archivo.txt");
stream.on("data", chunk => console.log("Chunk:", chunk));
```

## Tipos de Streams
- Readable
- Writable
- Duplex
- Transform
