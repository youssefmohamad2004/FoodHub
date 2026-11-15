export const money = (n) => "$" + Number(n || 0).toFixed(2);
export const itemUnitPrice = (item) =>
  item.price + (item.selectedExtras || []).reduce((s, e) => s + e.price, 0);
export const totals = (items, coupon = "") => {
  const subtotal = items.reduce((s, i) => s + itemUnitPrice(i) * i.quantity, 0);
  const discount = coupon.toUpperCase() === "FOOD10" ? subtotal * 0.1 : 0;
  const delivery = items.length === 0 || subtotal >= 40 ? 0 : 3;
  return {
    subtotal,
    discount,
    delivery,
    total: Math.max(0, subtotal - discount + delivery),
  };
};
