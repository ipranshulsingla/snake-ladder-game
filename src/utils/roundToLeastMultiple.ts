function roundToLeastMultiple(val: number, multipleOf: number = 10) {
  return Math.floor(val / multipleOf) * multipleOf;
}

export default roundToLeastMultiple;
