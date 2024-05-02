/* eslint-disable react/prop-types */

export default function Historial({ movimientos, onClick }) {
  return (
    <section
      style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}
    >
      <button onClick = {() => onClick([])}>Ir al inicio del juego</button>
      {movimientos.map((registro, registroIndex) => {
        let historial = [...movimientos]
        historial.length = registroIndex + 1
        return (
            <button onClick={() => onClick(historial)} key={registroIndex} style={{ marginTop: "10px" }}>
              Ir al movimiento #{registroIndex + 1} - Posicion {registro.posicion[0] + ';' + registro.posicion[1]} -
              Simbolo {registro.simbolo}
            </button>
          )
      })}
    </section>
  );
}
