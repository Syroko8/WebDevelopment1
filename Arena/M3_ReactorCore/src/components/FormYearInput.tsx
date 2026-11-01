import { useState } from "react";

const FormYearInput = (
    {label, customOnInput}:
    {label: string, customOnInput: (year: string) => void}
) => {

    const [value, setValue] = useState('')

    return (
        <>
            <div className="field">
                <label className="field-label" htmlFor="year">{label}</label>
                <input 
                    type="number" id="year" name="year" min="1940" placeholder="2026" 
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        customOnInput(e.target.value);
                    }}
                />
            </div>
        </>
    )
}

export default FormYearInput;