import type { contentState, contentType } from "../schemas/ItemSchema";

interface itemInfo {
    id: number,
    title: string,
    type: contentType,
    state: contentState,
    author_studio: string,
    rating: number,
    onModify: () => void,
    onDelete: () => void
}

const Item = (itemInfo: itemInfo) => {

    return (
        <div className="item-card">
            <p className="title">{itemInfo.title}</p>
            <p className="type">{itemInfo.type}</p>
            <p className="state">{itemInfo.state}</p>
            <p className="author_studio">{itemInfo.author_studio}</p>
            <p className="rating">{itemInfo.rating}</p>
            <button className="modify-btn">Modificar</button>
            <button className="delete-btn">Eliminar</button>
        </div>
    );
}

export default Item;