import '../styles/sideBar.css';
import { useState } from 'react';

const SideBar = () => {
    const [open, setOpen]  = useState();


    return (
        <>
            <div className='sidebar'>
                <div className='toggler'>
                    <button></button>
                </div>
                
            </div>
        </>
    );
}

export default SideBar;