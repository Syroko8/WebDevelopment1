type GenreoptionsProp = {
    genre: string,
    hidden: boolean,
    isSelected: boolean,
    customOnClick: (genreName: string) => void
}

const GenreOption = ({genre, hidden, isSelected, customOnClick} : GenreoptionsProp) => {

    return (
        <>
            <button 
                type="button"
                className={`genre-option ${isSelected ? 'selected' : ''}`} 
                hidden={hidden}
                onMouseDown={e => {
                    e.preventDefault();
                    customOnClick(genre);
                }}
            >{genre}</button>
        </>
    );
}

export default GenreOption;