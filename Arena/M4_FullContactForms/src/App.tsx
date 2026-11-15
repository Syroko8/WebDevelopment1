import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Formulary from './components/Formulary'
import ItemList from './components/ItemList'
import './styles/App.css'

function App() {

  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <div id='App'>
        <Formulary />
        <ItemList />
      </div>
    </QueryClientProvider>
    </>
  )
}

export default App
