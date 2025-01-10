export const calculateStandardDeviation = (data) => {
  console.log(data)
  const n = data.length;
  if (n === 0) return 0;

  const mean = data.reduce((sum, value) => sum + value, 0) / n;
  const variance =
    data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / n;

  return Math.sqrt(variance);
};
