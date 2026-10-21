import { useState } from "react"
import '../../styles/habitCard.css'

const TargetaHabito = ({ habit }: { habit: string }) => {

    const [completed, setCompleted] = useState(false)
    const [doneToday, setDoneToday] = useState(false)

    return (
        <div className={`habit-card ${completed ? 'completed' : ''}`}>
            <span className="title" title={habit}>{habit}</span>
            <div className="buttons">
                <button 
                    type="button"
                    className={`check check-today ${doneToday ? 'active' : ''}`}
                    onClick={() => setDoneToday(!doneToday)}
                    title="Marcar como hecho hoy"
                >
                    {doneToday ? '✓ Hecho hoy' : 'Hecho hoy'}
                </button>
                <button 
                    type="button"
                    className={`check check-completed ${completed ? 'active' : ''}`} 
                    onClick={() => setCompleted(!completed)}
                    title="Marcar hábito como completado"
                >
                    {completed ? '✓ Completada' : 'Completada'}
                </button>
            </div>
        </div>
    )
}

export default TargetaHabito