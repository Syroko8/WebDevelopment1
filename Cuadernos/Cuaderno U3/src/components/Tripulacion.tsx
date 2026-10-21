import FichaTripulante from "./FichaTripulante";

function Tripulacion() {
  return (
    <section>
      <h2>1.1 La tripulación</h2>
      <div className="fila">
        <FichaTripulante nombre="Ana" rol="Capitana" />
        <FichaTripulante nombre="Zork" rol="Piloto" especie="alienígena" />
        <FichaTripulante nombre="R2" rol="Mecánico" especie="robot" />
        <FichaTripulante nombre="Luis" rol="Médico" especie="vulcaniano" />
      </div>
    </section>
  );
}

export default Tripulacion;
