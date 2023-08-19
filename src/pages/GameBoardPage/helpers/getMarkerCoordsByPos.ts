const getMarkerCoordsByPos = (pos: number, size: number) => {
  const revPos = 100 - pos + 1;
  let x = 1;
  let y = 1;

  const yFloat = revPos / 10;
  const xFloat = revPos % 10;

  if (xFloat > 0 && xFloat < 1) {
    y = Math.ceil(yFloat) - (1 - xFloat);
    x = 1;
  } else {
    y = Math.ceil(yFloat);
    x = xFloat || 10;
  }

  if (Math.ceil(y) % 2 === 0) {
    x = 10 - x + 1;
  }

  return { x: size * (x - 1 / 2), y: size * (y - 1 / 2) };
};

export default getMarkerCoordsByPos;
