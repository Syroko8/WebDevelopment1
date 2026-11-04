import { useState } from "react"
import FormularioHabito from "./FormularioHabito";
import ListaHabitos from "./ListaHabitos";

const ForjaDeHabitos = () => {
    const [habits, setHabits] = useState([]);

    return (
        <>
            <FormularioHabito habitList={habits} addHabit={setHabits}/>
            <ListaHabitos habitList={habits}/>
        </>
    )
}

export default ForjaDeHabitos