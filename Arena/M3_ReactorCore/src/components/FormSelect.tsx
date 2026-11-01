import { useState } from "react";

const FormSelect = (
    {items, label, text, onSelected} : 
    {items:string[], label:string, text: string, onSelected:(val:string) => void}
) => {
 
    const [selected, setSelected] = useState('');

    return (
        <>
            <div className="field">
                <label className="field-label" htmlFor={label}>{text}</label>
                <select 
                    id={label}
                    onChange={e => {setSelected(e.target.value); onSelected(e.target.value)}}
                    value={selected === ''? 'Any' : selected}
                >
                    {items.map((item) => {
                        return <option key={item} value={item}>{item}</option>
                    })}
                </select>
            </div>
        </>
    );
}

export default FormSelect;