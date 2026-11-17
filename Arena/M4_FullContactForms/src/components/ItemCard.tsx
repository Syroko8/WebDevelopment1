import { MdMenuBook, MdAutoStories, MdTv, MdMovie } from 'react-icons/md';
import type { Item } from "../schemas/ItemSchema";
import '../styles/ItemCard.css';

export interface itemProp extends Item {
    onModify: () => void,
    onDelete: () => void
}

const ItemCard = (itemInfo: itemProp) => {

    return (
        <div className="item-card">
            <div className="card-info">
                <p className="title">{itemInfo.title}</p>
                <p className="author_studio">{itemInfo.author_studio}</p>
                <p className="state">{itemInfo.state}</p>
                <p className="rating">{itemInfo.rating}</p>
            </div>
            <div className='type-icon'>
                {itemInfo.type === "Libro"   && <MdMenuBook />}
                {itemInfo.type === "Manga"   && <MdAutoStories />}
                {itemInfo.type === "Serie"   && <MdTv />}
                {itemInfo.type === "Pelicula" && <MdMovie />}
            </div>
            <button className="modify-btn" onClick={itemInfo.onModify}>Modificar</button>
            <button className="delete-btn" onClick={itemInfo.onDelete}>Eliminar</button>
        </div>
    );
}

export default ItemCard;