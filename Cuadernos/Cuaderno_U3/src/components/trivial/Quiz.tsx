import { useState } from "react";
import { PREGUNTAS } from "../../data/preguntas";
import Resultado from "./Resultado";
import "../../styles/quiz.css";

function Quiz() {
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);

  // Pantalla final
  if (indice >= PREGUNTAS.length) {
    return (
      <Resultado
        puntos={puntos}
        total={PREGUNTAS.length}
        onReiniciar={() => {
          setIndice(0);
          setPuntos(0);
          setSeleccion(null);
        }}
      />
    );
  }

  const pregunta = PREGUNTAS[indice];

  function responder(i: number) {
    if (seleccion !== null) return; // ya respondida
    setSeleccion(i);
    if (i === pregunta.correcta) {
      setPuntos(puntos + 1);
    }
  }

  function siguiente() {
    setSeleccion(null);
    setIndice(indice + 1);
  }

  // La clase CSS se calcula durante el render
  function claseOpcion(i: number) {
    if (seleccion === null) return "opcion";
    if (i === pregunta.correcta) return "opcion correcta";
    if (i === seleccion) return "opcion incorrecta";
    return "opcion";
  }

  return (
    <section>
      <h2>Trivial de la Academia 🚀</h2>
      <p>
        Pregunta {indice + 1} de {PREGUNTAS.length}
      </p>
      <h3>{pregunta.texto}</h3>

      {pregunta.opciones.map((opcion, i) => (
        <button key={opcion} className={claseOpcion(i)} onClick={() => responder(i)}>
          {opcion}
        </button>
      ))}

      {seleccion !== null && (
        <button className="siguiente" onClick={siguiente}>
          Siguiente
        </button>
      )}
    </section>
  );
}

export default Quiz;
