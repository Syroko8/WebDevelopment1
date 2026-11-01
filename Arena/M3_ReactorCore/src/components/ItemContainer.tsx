import { useEffect, useState } from 'react';
import '../styles/itemContainer.css'
import ItemCard from './ItemCard';
import '../controller/itemController'
import { searchItems } from '../controller/itemController';
import type { ItemInfo } from '../model/itemInfo';

const ItemContainer = (
    {searchTrigger, informSearchDone}:
    {searchTrigger: boolean, informSearchDone: () => void}
) => {
    
    const [itemList, setItemList] = useState<ItemInfo[]>([]);    
    const initialMessage = 'Inserte los filtros deseados y haga su búsqueda';
    const [message, setMessage] = useState(initialMessage);
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {        
        if (!searchTrigger) return;

        const search = async () => {
            setMessage('Adquiriendo resultados');
            
            try {
                const items: ItemInfo[] = await searchItems();
                // Escondemos el mensage.
                setShowMessage(false);
                
                setItemList(items);

                if (items.length == 0) {
                    setMessage('Sin resultados');
                    setShowMessage(true);
                }

            } catch (e) {
                // Mostramos el error.
                e instanceof Error ? setMessage(e.message) : setMessage('Error desconocido');
                setShowMessage(true);
            } finally {
                // Notificamos al padre.
                informSearchDone();
            };
        }
        // Ejecutamos la búsqueda.
        search();
    }, [searchTrigger]);

    return (
        <>
            <div className="item-container">
                {
                    showMessage &&
                    <div className="inner"><p>{message}</p></div>
                }
                
                <div className="cards-grid">
                    {
                        itemList.map(item => {
                            return <ItemCard
                                key={item.id}  
                                item={item}
                            />
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ItemContainer;   