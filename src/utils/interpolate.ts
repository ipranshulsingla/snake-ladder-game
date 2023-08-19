function interpolate(inputValues: number[], outputValues: number[], x: number) {
  /*
   * Interpolates the output value for a given input using linear interpolation.
   *
   * Arguments:
   * inputValues -- Array of input values in ascending order.
   * outputValues -- Array of corresponding output values.
   * x -- Input value for which the output value needs to be interpolated.
   *
   * Returns:
   * Interpolated output value.
   */

  const n = inputValues.length;

  // Check if x is out of range
  if (x < inputValues[0] || x > inputValues[n - 1]) {
    throw new Error("Input value is out of range.");
  }

  // Find the interval in which x lies
  for (let i = 0; i < n - 1; i++) {
    if (inputValues[i] <= x && x <= inputValues[i + 1]) {
      // Perform linear interpolation
      const x0 = inputValues[i];
      const x1 = inputValues[i + 1];
      const y0 = outputValues[i];
      const y1 = outputValues[i + 1];
      const interpolatedValue = y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
      return interpolatedValue;
    }
  }

  return x;
}

export default interpolate;
