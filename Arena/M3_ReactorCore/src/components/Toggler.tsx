const Toggler = (
    {enabled, customOnClick} : 
    {enabled:boolean, customOnClick:() => void}
) => {

    return (
        <>
            <div className={`toggler-container ${enabled ? 'enabled' : ''}`}>
                <h1 className="title enabled">Delusion Tracker</h1>
                <div 
                    className="toggler"
                    onClick={customOnClick}
                >
                    <div className={`toggler-bar ${enabled ? 'enabled' : ''}`}></div>
                </div>
            </div>
        </>
    );
}

export default Toggler;