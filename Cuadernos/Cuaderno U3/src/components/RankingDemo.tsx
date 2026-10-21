import Ranking from "./Ranking";
import { RANKING } from "../data/ranking";

function RankingDemo() {
  return (
    <section>
      <h2>1.3 Ranking de la sala arcade</h2>
      <Ranking jugadores={RANKING} />
    </section>
  );
}

export default RankingDemo;
