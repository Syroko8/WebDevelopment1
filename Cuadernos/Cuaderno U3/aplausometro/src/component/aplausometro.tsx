import { useState } from "react";

const Aplausometro = () => {
    const [aplausos, setAplausos] = useState(0);

    let mensaje;
    if(aplausos < 5) mensaje = 'Aplausos normaless';
    if(aplausos > 5 && aplausos < 15) mensaje = 'Ovación';
    if(aplausos > 15) mensaje = 'Diosssss';
    
    return (<>
        <div>
            <p>{aplausos}</p>
            <button onClick={() => setAplausos(aplausos + 1)}>aplaudir</button>
            <p>{mensaje}</p>
        </div>
    </>
    );
}

export default Aplausometro;