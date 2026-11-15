import React, { createContext, useContext, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";
const C = createContext(null);
export const useOrders = () => useContext(C);
export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => readStorage("foodhub_orders", []));
  useEffect(() => writeStorage("foodhub_orders", orders), [orders]);
  const create = (customer, items, pricing) => {
    const id = "FH-" + Date.now().toString(36).toUpperCase();
    const order = {
      id,
      customer,
      items: JSON.parse(JSON.stringify(items)),
      pricing,
      status: 0,
      createdAt: new Date().toISOString(),
      paymentMethod: "Cash on Delivery",
    };
    setOrders((old) => [order, ...old]);
    return id;
  };
  const updateStatus = (id, status) =>
    setOrders((old) => old.map((x) => (x.id === id ? { ...x, status } : x)));
  return (
    <C.Provider value={{ orders, create, updateStatus }}>{children}</C.Provider>
  );
}
