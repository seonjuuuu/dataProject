import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const setOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <OrderContext.Provider value={{ selectedOrder, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
