import { useState } from "react";
import Tripulacion from "./components/Tripulacion";
import EsclusaDemo from "./components/EsclusaDemo";
import RankingDemo from "./components/RankingDemo";
import Aplausometro from "./components/Aplausometro";
import Quiz from "./components/Quiz";
import "./styles/app.css";
import ForjaDeHabitos from "./components/habitos/ForjaDeHabitos";

// Para cambiar de tarea solo hay que cambiar este valor
type Tarea = "1.1" | "1.2" | "1.3" | "1.4" | "mision1" | "mision2";

function App() {
  const [tarea, setTarea] = useState<Tarea>("1.1");

  return (
    <div className="app">
      <nav>
        <button onClick={() => setTarea("1.1")}>1.1 Tripulación</button>
        <button onClick={() => setTarea("1.2")}>1.2 Esclusa</button>
        <button onClick={() => setTarea("1.3")}>1.3 Ranking</button>
        <button onClick={() => setTarea("1.4")}>1.4 Aplausómetro</button>
        <button onClick={() => setTarea("mision1")}>Misión 1 Quiz</button>
        <button onClick={() => setTarea("mision2")}>Misión 2 Forja de hábitos</button>
      </nav>

      <main>
        {tarea === "1.1" && <Tripulacion />}
        {tarea === "1.2" && <EsclusaDemo />}
        {tarea === "1.3" && <RankingDemo />}
        {tarea === "1.4" && <Aplausometro />}
        {tarea === "mision1" && <Quiz />}
        {tarea === "mision2" && <ForjaDeHabitos />}
      </main>
    </div>
  );
}

export default App;
