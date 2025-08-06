export function formatNumber(value: number): string {
    return new Intl.NumberFormat("en-US").format(value);
  }
  
  export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  }
  