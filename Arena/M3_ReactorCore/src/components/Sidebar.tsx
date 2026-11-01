import '../styles/sideBar.css'
import '../styles/filterMenu.css'
import { useState } from 'react';
import Toggler from './Toggler';
import type { ItemTypes } from '../model/itemInfo';
import TypeButton from './TypeButton';
import FormTextInput from './FormTextInput';
import { UIInfo } from '../main';
import FormGenreField from './FormGenreField';
import FormYearInput from './FormYearInput';
import FormSelect from './FormSelect';
import { airingStatus, seasons } from '../model/filters';

const Sidebar = ({onSearchClick} : {onSearchClick: ()=>void}) => {

    const [enableSidebar, setEnableSidebar] = useState(true); 
    const [enabledType, setEnabledType] = useState<ItemTypes>('anime');

    function handleTogglerClick() {        
        setEnableSidebar(!enableSidebar);
    }

    function handleTypeTogglerClick(type: ItemTypes) {  
        UIInfo.type = type;      
        type === 'anime' ? setEnabledType('anime') : setEnabledType('manga');
    }

    function handleTitleInput(title: string) {
        UIInfo.name = title;
    }

    function handleYearInput(year: string) {
        UIInfo.year = year;
    }

    function handleSeasonsSelect(season: string) {
        UIInfo.season = season;
    }

    function handleAiringStatusSelect(airingStatus: string) {
        UIInfo.airingStatus = airingStatus;
    }

    return (
        <>
            <div className={`sidebar ${enableSidebar ? 'enabled' : ''}`}>
                
                <Toggler 
                    enabled={enableSidebar} 
                    customOnClick={handleTogglerClick} 
                />
                <div className={`filters ${enableSidebar ? 'enabled':''}`}>
                    <div className="type-selector">
                        <TypeButton 
                            text='Anime'
                            type='anime'
                            selected={enabledType === 'anime'}
                            customOnClick={handleTypeTogglerClick}
                        />
                        <TypeButton 
                            text='Manga'
                            type='manga'
                            selected={enabledType === 'manga'}
                            customOnClick={handleTypeTogglerClick}
                        />
                    </div>
                    <form className="filter-form" id="filter-form">
                        
                        <FormTextInput
                            label='Name'
                            placeholder='Search by title'
                            onInput={handleTitleInput}
                        />
                        
                        <FormGenreField/>

                        <FormYearInput 
                            label='Year' 
                            customOnInput={handleYearInput}
                        />

                        <FormSelect 
                            label='seasons'
                            text='Seasons'
                            items={seasons}
                            onSelected={handleSeasonsSelect}
                        />

                        <FormSelect 
                            label='airingStatus'
                            text='Airing status'
                            items={airingStatus}
                            onSelected={handleAiringStatusSelect}
                        />

                        <button 
                            type="button" className="search-button"
                            onClick={onSearchClick}
                        >Search</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Sidebar;