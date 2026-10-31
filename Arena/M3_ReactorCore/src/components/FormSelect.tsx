import { useState } from "react";

const FormSelect = ({items, onSelected} : {items:string[], onSelected:CallableFunction}) => {
 
    const [selected, setSelected] = useState('');

    return (
        <>
            <div className="field">
                <label className="field-label" htmlFor="airingStatus">Airing status</label>
                <select 
                    name="airingStatus" id="airingStatus"
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