# Lección 2: Lectura y Escritura con Streams
# 🧠 Cómo estudiar esta lección
1. Ejecuta los ejemplos en Node.
2. Observa el flujo data -> end.

## Lectura
```js
const fs = require("fs");
const read = fs.createReadStream("input.txt");
read.on("data", c => console.log("chunk:", c));
```

## Escritura
```js
const fs = require("fs");
const write = fs.createWriteStream("output.txt");
write.write("Hola Stream");
write.end();
```

## Pipe
```js
read.pipe(write);
```
