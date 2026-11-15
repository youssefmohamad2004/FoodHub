export const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const validPhone = (v) =>
  /^\+?[\d\s()-]{7,20}$/.test(v) &&
  v.replace(/\D/g, "").length >= 7 &&
  v.replace(/\D/g, "").length <= 15;
