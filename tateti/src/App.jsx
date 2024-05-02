import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Tablero from "./components/Tablero";
import Historial from "./components/Historial";

const TABLERO = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];

function App() {
  const [juego, setJuego] = useState({
    jugadorActivo: "X",
    movimientos: [],
    tableroActivo: TABLERO,
    ganador: [false, "-"],
    movimientoActivo: -1,
  });

  function gestionarClickEnBoton(posicion) {
    setJuego((prevJuego) => {
      const nuevoTablero = [
        ...prevJuego.tableroActivo.map((fila) => [...fila]),
      ];
      nuevoTablero[posicion[0]][posicion[1]] = prevJuego.jugadorActivo;

      let nuevosMovimientos;
      if (prevJuego.movimientoActivo === -1) {
        nuevosMovimientos = [
          ...prevJuego.movimientos,
          { simbolo: prevJuego.jugadorActivo, posicion },
        ];
      } else {
        nuevosMovimientos = [...prevJuego.movimientos];
        nuevosMovimientos.length = prevJuego.movimientoActivo;
        nuevosMovimientos = [
          ...nuevosMovimientos,
          { simbolo: prevJuego.jugadorActivo, posicion },
        ];
      }

      return {
        ...prevJuego,
        jugadorActivo: prevJuego.jugadorActivo === "X" ? "O" : "X",
        movimientos: nuevosMovimientos,
        tableroActivo: nuevoTablero,
        movimientoActivo: -1,
      };
    });
  }

  useEffect(() => {
    let nuevoGanador = [false, "-"];

    for (let f = 0; f < 3; f++) {
      //Ganador en horizontal
      if (
        juego.tableroActivo[f][0] !== "-" &&
        juego.tableroActivo[f][0] === juego.tableroActivo[f][1] &&
        juego.tableroActivo[f][0] === juego.tableroActivo[f][2]
      ) {
        nuevoGanador = [true, juego.tableroActivo[f][0]];
      }
      //Ganador en vertical
      if (
        juego.tableroActivo[0][f] !== "-" &&
        juego.tableroActivo[0][f] === juego.tableroActivo[1][f] &&
        juego.tableroActivo[0][f] === juego.tableroActivo[2][f]
      ) {
        nuevoGanador = [true, juego.tableroActivo[0][f]];
      }
      //Ganador en diagonal \
      if (
        juego.tableroActivo[0][0] !== "-" &&
        juego.tableroActivo[0][0] === juego.tableroActivo[1][1] &&
        juego.tableroActivo[0][0] === juego.tableroActivo[2][2]
      ) {
        nuevoGanador = [true, juego.tableroActivo[1][1]];
      }
      //Ganador en diagonal /
      if (
        juego.tableroActivo[0][2] !== "-" &&
        juego.tableroActivo[0][2] === juego.tableroActivo[1][1] &&
        juego.tableroActivo[0][2] === juego.tableroActivo[2][0]
      ) {
        nuevoGanador = [true, juego.tableroActivo[1][1]];
      }
    }

    setJuego((prevJuego) => {
      return {
        ...prevJuego,
        ganador: nuevoGanador,
      };
    });
  }, [juego.tableroActivo]);

  let ganadorContent =
    juego.ganador[1] === "-" && juego.movimientos.length === 9 ? (
      <p>EMPATE!</p>
    ) : (
      <p>Es turno del jugador {juego.jugadorActivo}</p>
    );
  if (juego.ganador[0]) {
    ganadorContent = <p>El ganador es {juego.ganador[1]}</p>;
  }

  function gestionarClickEnRegistro(historial) {
    setJuego((prevJuego) => {
      const nuevoTablero = [...TABLERO.map(fila => [...fila])];
      historial.forEach((h) => {
        nuevoTablero[h.posicion[0]][h.posicion[1]] = h.simbolo;
      });

      return {
        ...prevJuego,
        tableroActivo: nuevoTablero,
        jugadorActivo: historial.length % 2 ? 'O' : 'X',
        movimientoActivo: historial.length,
      };
    });
  }

  return (
    <>
      <Header />
      {ganadorContent}
      <Tablero
        tablero={juego.tableroActivo}
        onClick={gestionarClickEnBoton}
        ganador={juego.ganador[1]}
      />
      <Historial
        movimientos={juego.movimientos}
        onClick={gestionarClickEnRegistro}
      />
    </>
  );
}

export default App;
