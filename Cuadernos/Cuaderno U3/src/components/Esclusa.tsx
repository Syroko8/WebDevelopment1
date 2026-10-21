type Props = {
  abierta: boolean;
  avisos: number;
};

function Esclusa({ abierta, avisos }: Props) {
  return (
    <article className="card">
      <p>{abierta ? "🟢 Esclusa abierta" : "🔴 Esclusa cerrada"}</p>
      {avisos > 0 && <p>⚠️ Tienes {avisos} avisos pendientes</p>}
    </article>
  );
}

export default Esclusa;
