import './App.css';
import TableList from './pages/TableList';
import TopForm from './pages/TopForm';
import { OrderProvider } from './contexts/OrderCopy';

function App() {
  return (
    <OrderProvider>
      <TopForm />
      <TableList />
    </OrderProvider>
  );
}

export default App;
