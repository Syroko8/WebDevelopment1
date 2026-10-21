import { useState } from "react"

const FormularioHabito = ({ habitList, addHabit }: { habitList: string[], addHabit: CallableFunction }) => {

    const [input, setInput] = useState('')

    return (
        <>
            <div className="menuBar">
                <input type="text" onChange={(e) => setInput(e.target.value)} />
                <button onClick={() => {
                    if (input != '') {
                        addHabit([...habitList, input])
                        document.querySelector('input')!.value = ''
                    }
                    setInput('')
                }}>+</button>
            </div>
        </>
    )
}

export default FormularioHabito