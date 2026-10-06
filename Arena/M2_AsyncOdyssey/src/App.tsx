import './styles/app.css'
import ItemContainer from './components/itemContainer'
import SideBar from './components/SideBar'

function App() {

  return (
    <div className='app'>
      <SideBar />
      <ItemContainer />
    </div>
  )
}

export default App