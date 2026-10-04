import '../styles/itemCard.css';
import TestIMage from '../assets/testIMage.png'
import type { ItemInfo } from '../model/itemInfo';

const ItemCard = ({itemInfo} : {itemInfo: ItemInfo}) => {

    return (
        <>
            <div className="item-card">
                <img src={TestIMage} alt="Image" className='front-image' />
                <div className='title-wrap'>
                    <p className='title'>Bocchi the rock</p>
                </div>
            </div>
        </>
    )
}

export default ItemCard