export function formatForHistogramData(data: any) {
  const aa = data.map(item => ({
    ...item,
    value: Math.abs(item.close - item.open),
    color: item.close > item.open ? 'green' : 'red',
  }));
  console.log('Formatted Histogram Data:', aa);
  return aa;
}
