import type { ItemInfo } from '../model/itemInfo';
import '../styles/itemCard.css'

const ItemCard = ({item} : {item: ItemInfo}) => {
    return (
        <>
            <div className='item-card'>
                <img src={item.image} alt={item.titleEnglish} className="front-image"/>
                <div className="title-wrap">
                    <p>{item.titleEnglish}</p>
                </div>
            </div>
        </>
    );
}

export default ItemCard;