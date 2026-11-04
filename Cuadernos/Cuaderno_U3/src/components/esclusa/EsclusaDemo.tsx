import Esclusa from "./Esclusa";

function EsclusaDemo() {
  return (
    <section>
      <h2>1.2 Estado de la esclusa</h2>
      <div className="fila">
        <Esclusa abierta={true} avisos={2} />
        <Esclusa abierta={false} avisos={0} />
        <Esclusa abierta={true} avisos={0} />
      </div>
    </section>
  );
}

export default EsclusaDemo;
