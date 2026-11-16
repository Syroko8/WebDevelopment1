import type { Item } from "../schemas/ItemSchema";

export interface itemProp extends Item {
    onModify: () => void,
    onDelete: () => void
}

const ItemCard = (itemInfo: itemProp) => {

    return (
        <div className="item-card">
            <p className="title">{itemInfo.title}</p>
            <p className="author_studio">{itemInfo.author_studio}</p>
            <p className="state">{itemInfo.state}</p>
            <p className="rating">{itemInfo.rating}</p>
            <button className="modify-btn" onClick={itemInfo.onModify}>Modificar</button>
            <button className="delete-btn" onClick={itemInfo.onDelete}>Eliminar</button>
        </div>
    );
}

export default ItemCard;