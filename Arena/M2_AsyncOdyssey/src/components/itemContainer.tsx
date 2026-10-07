import type { Filters } from '../model/filters';
import '../styles/itemContainer.css';

const ItemContainer = ({itemFilters} : {itemFilters: Filters}) => {

    // Petición de items.

    return (
        <>
            <div className='item-container'>
                <div className='inner'></div>    
            </div>       
        </>
    );
}

export default ItemContainer;