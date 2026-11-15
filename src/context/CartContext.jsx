import React, { createContext, useContext, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";
const C = createContext(null);
export const useCart = () => useContext(C);
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage("foodhub_cart", []));
  const [coupon, setCoupon] = useState(() => readStorage("foodhub_coupon", ""));
  useEffect(() => writeStorage("foodhub_cart", items), [items]);
  useEffect(() => writeStorage("foodhub_coupon", coupon), [coupon]);
  const add = (food, quantity = 1, selectedExtras = [], instructions = "") => {
    const key =
      food.id +
      "-" +
      selectedExtras
        .map((x) => x.id)
        .sort()
        .join("-") +
      "-" +
      instructions.trim();
    setItems((old) => {
      const match = old.find((x) => x.cartItemId === key);
      return match
        ? old.map((x) =>
            x.cartItemId === key
              ? { ...x, quantity: Math.min(20, x.quantity + quantity) }
              : x,
          )
        : [
            ...old,
            {
              cartItemId: key,
              productId: food.id,
              name: food.name,
              image: food.image,
              fallbackImage: food.fallbackImage,
              price: food.price,
              quantity,
              selectedExtras,
              instructions,
            },
          ];
    });
  };
  const update = (id, qty) =>
    setItems((old) =>
      old.map((x) =>
        x.cartItemId === id
          ? { ...x, quantity: Math.max(1, Math.min(20, qty)) }
          : x,
      ),
    );
  const remove = (id) =>
    setItems((old) => old.filter((x) => x.cartItemId !== id));
  const clear = () => {
    setItems([]);
    setCoupon("");
  };
  return (
    <C.Provider
      value={{
        items,
        coupon,
        setCoupon,
        add,
        update,
        remove,
        clear,
        count: items.reduce((s, x) => s + x.quantity, 0),
      }}
    >
      {children}
    </C.Provider>
  );
}
