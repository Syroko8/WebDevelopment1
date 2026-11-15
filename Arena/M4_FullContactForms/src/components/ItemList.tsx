import { useQuery } from "@tanstack/react-query";
import { getItems } from "../services/itemService";
import { contentTypes } from "../schemas/ItemSchema";
import { useState } from "react";

const ItemList = () => {

    const [type, setType] = useState(contentTypes[0]);

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    });

    return (
        <div className="item-list">
            <div className="filter">
                <label htmlFor="type">Tipo</label>
                <select 
                    value={type}
                    id="type"
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="" disabled>Selecciona un tipo</option>
                    {contentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
            <div className="content">
                {isPending && <span className="spinner"></span>}
                {isError && <div className="query-error">Se ha producido un error: {error.message}</div>}
                {!isError && !isPending && (
                    "" // Mostramos lista.
                )
                }
            </div>
        </div>
    );
}

export default ItemList;