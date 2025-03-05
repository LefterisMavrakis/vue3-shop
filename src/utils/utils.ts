export const convertToEuroPrice = (number: number | bigint | string) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(number))
}
