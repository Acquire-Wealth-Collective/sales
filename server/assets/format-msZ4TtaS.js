const formatCurrency = (n) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
}).format(Number.isFinite(n) ? n : 0);
const formatNumber = (n) => new Intl.NumberFormat("en-US").format(Number.isFinite(n) ? n : 0);
const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC"
});
const formatTime = (time) => {
  const [hourStr, minute] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${minute} ${period}`;
};
const toNumber = (v) => {
  if (v === "" || v === null || v === void 0) return 0;
  const n = typeof v === "number" ? v : Number(String(v).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};
export {
  formatCurrency as a,
  formatTime as b,
  formatNumber as c,
  formatDate as f,
  toNumber as t
};
