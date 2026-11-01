import './styles/App.css'
import ItemContainer from './components/ItemContainer'
import Sidebar from './components/Sidebar'
import { useState } from 'react'

function App() {

  const [proceedToFetch, setProceedToFetch] = useState(false);

  function handleSearch() {
    setProceedToFetch(true);  
  }

  function handleSearchDone() {
    setProceedToFetch(false);
  }

  return (
    <>
      <div id='App'>
        <Sidebar 
          onSearchClick={handleSearch}
        />
        <ItemContainer
          searchTrigger={proceedToFetch}
          informSearchDone={handleSearchDone}
        />
      </div>
    </>
  )
}

export default App
