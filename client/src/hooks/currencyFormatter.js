export default function currencyFormatter(amount, currency) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD',
    });
    return formatter.format(amount)
}