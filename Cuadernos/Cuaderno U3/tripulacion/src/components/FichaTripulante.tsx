import type { Info } from "../model/Info";

const FichaTripulante = ({info} : {info: Info}) => {


    return (
        <>
            <h2>{info.name}</h2>
            <p>{info.rol}</p>
            <p>{info.especie}</p>
        </>
    );

}


export default FichaTripulante;