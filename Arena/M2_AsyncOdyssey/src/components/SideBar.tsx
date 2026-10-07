import '../styles/sideBar.css';
import { useState } from 'react';

const SideBar = () => {
    const [enabledMenu, setEnabledMenu]  = useState(true);

    const handleToggleMenu = () => {
        setEnabledMenu(!enabledMenu);    
    }

    const isEnabled = enabledMenu? 'enabled' : '';

    return (
        <>
            <div className={`sidebar ${isEnabled}`}>
                <div className={`toggler-container ${isEnabled}`}>
                    <div className={`title ${isEnabled}`}>Delusion Tracker</div>
                    <div className='toggler' onClick={handleToggleMenu}>
                        <div className={`toggler-bar ${isEnabled}`}></div>
                    </div>  
                </div>
            </div>
        </>
    );
}

export default SideBar;