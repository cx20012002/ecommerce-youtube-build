export function formatCurrency(
  amount: number,
  currencyCode: string = "NZD",
): string {
  try {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(amount);
  } catch (error) {
    console.error("Error formatting currency", currencyCode, error);
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
  }
}
