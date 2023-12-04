import './App.css';
import TableList from './pages/TableList';
import TopForm from './pages/TopForm';
import { OrderProvider } from './contexts/Order';
function App() {
  return (
    <OrderProvider>
      <TopForm />
      <TableList />
    </OrderProvider>
  );
}

export default App;
