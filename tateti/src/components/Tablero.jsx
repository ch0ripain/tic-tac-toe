/* eslint-disable react/prop-types */


export default function Tablero({tablero, onClick, ganador}) {
  return (
    <section>
      {tablero.map((fila, filaIndex) => (
        <li key={filaIndex} style={{listStyle: "none"}}>
            {fila.map((simbolo, columnaIndex) => <button disabled={simbolo !== '-' || ganador !== '-'} onClick={() => onClick([filaIndex, columnaIndex])} key={[filaIndex, columnaIndex]}>{simbolo}</button>)}
        </li>
      ))}
    </section>
  );
}
