import type { Jugador } from "../data/ranking";

type Props = {
  jugadores: Jugador[];
};

function Ranking({ jugadores }: Props) {
  return (
    <ol>
      {jugadores.map((j) => (
        <li key={j.id}>
          {j.jugador} — {j.puntos} {j.puntos > 8000 && "🏅"}
        </li>
      ))}
    </ol>
  );
}

export default Ranking;
