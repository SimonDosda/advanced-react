export default function formatMoney(amount = 0) {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  });
  return formatter.format(amount / 100);
}
