import { useState } from "react";

const TextInput = (
    {label, placeholder, onInput} : 
    {label:string, placeholder:string, onInput:(val:string) => null}
) => {
 
    const [text, setText] = useState('')

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
        onInput(e.target.value);
    }

    return (
        <>
            <div className="field">
                <label className="field-label" htmlFor="name">{label}</label>
                <input 
                    type="text" id="name" placeholder={placeholder} value={text}
                    onChange={e => handleInput(e)}
                />
            </div>
        </>
    );
}

export default TextInput;