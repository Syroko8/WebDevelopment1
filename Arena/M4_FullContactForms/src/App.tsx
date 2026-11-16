import Formulary from './components/Formulary'
import ItemList from './components/ItemList'
import './styles/App.css'
import CustomHeader from './components/CustomHeader';
import { useState } from 'react';
import type { Item } from './schemas/ItemSchema';

function App() {

  const [editingItem, setEditingItem] = useState<Item | null>(null);

  return (
    <div id='App'>
      <CustomHeader />
      <div className='container'>
        <Formulary
        key={editingItem?.id ?? "new"}
          itemToEdit = {editingItem}
          onCancelEdit = {() => setEditingItem(null)}
        />
        <ItemList 
          onItemEdition = {(item) => setEditingItem(item)}
        />
      </div>
    </div>
  )
}

export default App
