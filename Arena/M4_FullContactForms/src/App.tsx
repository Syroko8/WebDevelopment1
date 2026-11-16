import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Formulary from './components/Formulary'
import ItemList from './components/ItemList'
import './styles/App.css'
import CustomHeader from './components/CustomHeader';

function App() {

  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <div id='App'>
        <CustomHeader />
        <div className='container'>
          <Formulary />
          <ItemList />
        </div>
      </div>
    </QueryClientProvider>
    </>
  )
}

export default App
