const GenreSelect = () => {

    return (
        <>
            <div className="field genre-field">
                <label className="field-label" htmlFor="genre-search">Genres <small id="genre-count"></small></label>
                <input type="search" id="genre-search" placeholder="Find a genre"/>
                <div className="genre-list" hidden id="genre-list"></div>
              </div>
        </>
    );
}

export default GenreSelect;