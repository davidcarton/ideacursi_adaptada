# Lección 3: Streams Avanzados
# 🧠 Cómo estudiar esta lección
1. Prueba Transform streams con zlib.
2. Comprende backpressure mediante pipe.

## Transform Stream
```js
const zlib = require("zlib");
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("salida.gz"));
```

## Backpressure
Se produce cuando el destino no procesa datos tan rápido como el origen.

## Ejercicio
Comprime un archivo y luego descomprímelo usando streams.
