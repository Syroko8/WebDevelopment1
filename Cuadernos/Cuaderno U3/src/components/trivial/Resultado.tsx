type Props = {
  puntos: number;
  total: number;
  onReiniciar: () => void;
};

function Resultado({ puntos, total, onReiniciar }: Props) {
  // Todo se deriva de puntos, no se guarda en estado
  const porcentaje = (puntos / total) * 100;

  let mensaje = "¡Sigue practicando!";
  if (porcentaje === 100) {
    mensaje = "¡Cerebro de quiz! 🧠";
  } else if (porcentaje >= 50) {
    mensaje = "¡Buen trabajo!";
  }

  return (
    <div>
      <h2>Resultado</h2>
      <p>
        {puntos} de {total} aciertos ({porcentaje}%)
      </p>
      <p>{mensaje}</p>
      <button onClick={onReiniciar}>Jugar otra vez</button>
    </div>
  );
}

export default Resultado;
