import { useState } from "react";
import { genres } from "../model/genres";
import GenreOption from "./GenreOption";
import { UIInfo } from "../main";


const GenreSelect = () => {

    const [selected, setSelected] = useState(new Set<string>());
    const [pickerVisibility, setPickerVisibility] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // Función que añade o elimina un género de la lista de escogidos.
    function handleOptionClick(genreName: string) {
        const newSelected = new Set(selected);
        newSelected.has(genreName) ? newSelected.delete(genreName) : newSelected.add(genreName);
        setSelected(newSelected);
        UIInfo.genresTags = [...newSelected];
    }
    
    return (
        <>
            <div className="field genre-field">
                <label className="field-label" htmlFor="genre-search">Genres
                 {selected.size == 0 ? '' : `${selected.size} selected`}
                </label>
                <input type="search" id="genre-search" placeholder="Find a genre"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onFocus={() => setPickerVisibility(true)}
                    onBlur={() => setPickerVisibility(false)}
                />
                {pickerVisibility && <div className="genre-list" id="genre-list">
                    {genres.map(genre => {
                        // Comprobamos que coincida.
                        const query = inputValue.trim().toLowerCase();
                        const matches = genre.name.toLowerCase().includes(query);
                        
                        // Comprobamos que esté disponible.
                        const isAvailable = UIInfo.type === 'manga' || genre.animeId != null;
                        
                        // Decidimos si mostrarlo o no.
                        const isHidden = !matches || !isAvailable;

                        return (
                            <GenreOption 
                                key={genre.name}
                                genre={genre.name} 
                                hidden={isHidden}
                                isSelected={selected.has(genre.name)}
                                customOnClick={handleOptionClick}
                            />
                        );
                    })}
                </div>}
            </div>
        </>
    );
}

export default GenreSelect;