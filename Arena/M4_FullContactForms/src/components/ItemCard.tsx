import type { contentState, contentType } from "../schemas/ItemSchema";

export interface itemProp {
    id: string,
    title: string,
    type: contentType,
    state: contentState,
    author_studio: string,
    rating: number,
    onModify: (id: string) => void,
    onDelete: (id: string) => void
}

const ItemCard = (itemInfo: itemProp) => {

    return (
        <div className="item-card">
            <p className="title">{itemInfo.title}</p>
            <p className="author_studio">{itemInfo.author_studio}</p>
            <p className="state">{itemInfo.state}</p>
            <p className="rating">{itemInfo.rating}</p>
            <button className="modify-btn" onClick={() => itemInfo.onModify(itemInfo.id)}>Modificar</button>
            <button className="delete-btn" onClick={() => itemInfo.onDelete(itemInfo.id)}>Eliminar</button>
        </div>
    );
}

export default ItemCard;