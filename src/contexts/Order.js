import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectRowNum, setSelectRowNum] = useState([]);

  const setOrder = (order) => {
    setSelectedOrder(order);
  };

  const setDelete = (deleteNum) => {
    setSelectRowNum(deleteNum);
  };

  return (
    <OrderContext.Provider
      value={{
        selectedOrder,
        setOrder,
        setDelete,
        selectRowNum,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
