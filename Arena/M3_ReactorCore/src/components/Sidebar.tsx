import '../styles/sideBar.css'
import '../styles/filterMenu.css'

const Sidebar = () => {

    return (
        <>
            <div className="sidebar enabled">
                <div className="toggler-container enabled">
                    <h1 className="title enabled">Delusion Tracker</h1>
                    <div className="toggler">
                    <div className="toggler-bar enabled"></div>
                    </div>
                </div>

                <div className="filters enabled">
                    <div className="type-selector">
                        <button className="manga-selector">Manga</button>
                        <button className="anime-selector" disabled>Anime</button>
                    </div>
                    <form className="filter-form" id="filter-form">
                        
                        <div className="field">
                        <label className="field-label" htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Search by title" />
                        </div>
                        
                        <div className="field genre-field">
                        <label className="field-label" htmlFor="genre-search">Genres <small id="genre-count"></small></label>
                        <input type="search" id="genre-search" placeholder="Find a genre"/>
                        <div className="genre-list" hidden id="genre-list"></div>
                        </div>

                        <div className="field">
                        <label className="field-label" htmlFor="year">Year</label>
                        <input type="number" id="year" name="year" min="1940" placeholder="2026" />
                        </div>

                        <div className="field">
                        <label htmlFor="seasons" className="field-label">Seasons</label>
                        <select name="seasons" id="seasons"></select>
                        </div>

                        <div className="field">
                        <label className="field-label" htmlFor="airingStatus">Airing status</label>
                        <select name="airingStatus" id="airingStatus"></select>
                        </div>

                        <button type="button" className="search-button">Search</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Sidebar;