import { useState } from "react";

const FormSelect = (
    {items, label, onSelected} : 
    {items:string[], label:string, onSelected:(val:string) => null}
) => {
 
    const [selected, setSelected] = useState('');

    return (
        <>
            <div className="field">
                <label className="field-label" htmlFor="select">{label}</label>
                <select 
                    id="select"
                    onChange={e => {setSelected(e.target.value); onSelected(e.target.value)}}
                    value={selected === ''? 'Any' : selected}
                >
                    {items.map((item) => {
                        return <option value={item}>{item}</option>
                    })}
                </select>
            </div>
        </>
    );
}

export default FormSelect;