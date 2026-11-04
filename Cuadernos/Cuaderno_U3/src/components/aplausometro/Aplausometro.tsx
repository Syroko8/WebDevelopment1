import { useState } from "react";

function Aplausometro() {
  const [contador, setContador] = useState(0);

  // El mensaje NO es estado: se calcula a partir del contador
  let mensaje = "Tímido...";
  if (contador >= 15) {
    mensaje = "¡OVACIÓN TOTAL! 🎉";
  } else if (contador >= 5) {
    mensaje = "¡Se anima la sala!";
  }

  return (
    <section>
      <h2>1.4 El aplausómetro</h2>
      <p className="grande">{contador}</p>
      <p>{mensaje}</p>
      <button onClick={() => setContador(contador + 1)}>👏 Aplaudir</button>
      <button onClick={() => setContador(0)}>Reiniciar</button>
    </section>
  );
}

export default Aplausometro;
