import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/sumarMatricez", (req, res) => {
  const { values, filas, columnas } = req.body;
  console.log(values);
  const mResult = Array.from({ length: filas }, () =>
    Array.from({ length: columnas })
  );
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let valueA = parseFloat(values[`A:[${i}][${j}]`]);
      let valueB = parseFloat(values[`B:[${i}][${j}]`]);
      if (Number.isNaN(valueA) || Number.isNaN(valueB)) {
        return res
          .status(400)
          .json({ error: "Todos los campos son requeridos" });
      }
      mResult[i][j] =
        Number(values[`A:[${i}][${j}]`]) + Number(values[`B:[${i}][${j}]`]);
    }
  }
  return res.json({ mResult });
});

app.post("/api/multiplicarMatricez", (req, res) => {
  const { values, filas, columnas, filas2, columnas2 } = req.body;
  console.log(values);
  const mResult = Array.from({ length: filas }, () =>
    Array.from({ length: columnas2 })
  );
    if (columnas !== filas2) {
    return res.status(400).json({ error: "Las matrices no son compatibles" });
  }

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas2; j++) {
      let sum = 0;
      for (let k = 0; k < columnas; k++) {
        let valueA = parseFloat(values[`A:[${i}][${k}]`]);
        let valueB = parseFloat(values[`B:[${k}][${j}]`]);
        if (Number.isNaN(valueA) || Number.isNaN(valueB)) {
          return res
            .status(400)
            .json({ error: "Todos los campos son requeridos" });
        }
        sum += valueA * valueB;
      }
      mResult[i][j] = sum;
    }
  }
  console.log(mResult);
  return res.json({ mResult });
});

app.post("/api/restarMatricez", (req, res) => {
  const { values, filas, columnas } = req.body;
  console.log(values);
  const mResult = Array.from({ length: filas }, () =>
    Array.from({ length: columnas })
  );
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let valueA = parseFloat(values[`A:[${i}][${j}]`]);
      let valueB = parseFloat(values[`B:[${i}][${j}]`]);
      if (Number.isNaN(valueA) || Number.isNaN(valueB)) {
        return res
          .status(400)
          .json({ error: "Todos los campos son requeridos" });
      }
      mResult[i][j] =
        Number(values[`A:[${i}][${j}]`]) - Number(values[`B:[${i}][${j}]`]);
    }
  }
  return res.json({ mResult });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
