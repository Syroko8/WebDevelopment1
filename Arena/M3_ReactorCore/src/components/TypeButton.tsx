import type { ItemTypes } from "../model/itemInfo";

const TypeButton = (
    {text, type, selected, customOnClick}:
    {text: string, type: ItemTypes, selected: boolean , customOnClick:(type: ItemTypes) => void}
) => {

    return (
        <>  
            <button
                className={`${type}-selector`}
                disabled={selected}
                onClick={() => customOnClick(type)}
            >{text}</button>
        </>
    );
}

export default TypeButton;