type Props = {
  nombre: string;
  rol: string;
  especie?: string;
};

function FichaTripulante({ nombre, rol, especie = "humana" }: Props) {
  return (
    <article className="card">
      <h3>{nombre}</h3>
      <p>Rol: {rol}</p>
      <p>Especie: {especie}</p>
    </article>
  );
}

export default FichaTripulante;
