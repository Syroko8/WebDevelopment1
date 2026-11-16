import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItem, getItems } from "../services/itemService";
import { contentTypes, type Item } from "../schemas/ItemSchema";
import { useState } from "react";
import ItemCard from "./ItemCard";
import '../styles/ItemList.css';

const ItemList = (
    {onItemEdition} : {onItemEdition: (item: Item) => void}
) => {
    const [type, setType] = useState<string>("");
    const queryClient = useQueryClient();

    const { data, isPending, isError, error, isFetching } = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
        staleTime: 30_000,
    });

    function handleOnModify(item: Item) {
        onItemEdition(item);
    }   
    
    function handleOnDelete(id: string) {
        deleteMutation.mutate(id);
    }

    const deleteMutation = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
        },
    });

    return (
        <div className="item-list">
            <div className="filter">
                <label htmlFor="filer-type">Tipo</label>
                <select 
                    value={type}
                    id="filer-type"
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Todos</option>
                    {contentTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            {isFetching && !isPending && <span className="spinner small" aria-label="Actualizando" />}
            {deleteMutation.isError && <p role="alert" className="error">No se pudo guardar: {deleteMutation.error.message}</p>}
            
            <div className="content">
                {isPending && <span className="spinner"></span>}
                {isError && <div className="query-error">Se ha producido un error: {error.message}</div>}
                {!isError && !isPending && (
                    data?.filter((item) => !type || item.type === type)
                    .map((item) => (
                        <ItemCard 
                            key={item.id} 
                            {...item} 
                            onModify={() => handleOnModify(item)}
                            onDelete={() => handleOnDelete(item.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default ItemList;