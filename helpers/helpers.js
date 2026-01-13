/**
 * Calculate the square of the euclidean distance between two points
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @returns square distance
 */
function squareDistance(x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

/**
 * Calculate the s euclidean distance between two points
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns distance
 */
function distance(x1, y1, x2, y2) {
  return Math.sqrt(squareDistance(x1, y1, x2, y2));
}

/**
 * Calculate if the given x & y are outside the bounds of the canvas
 * @param {Number} x
 * @param {Number} y
 * @returns true if out of bounds, false otherwise
 */
function outOfBounds(x, y) {
  if (x < 0 || x > width || y < 0 || y > height) return true;
  return false;
}

/**
 * @param {Number} x
 * @param {Number} y
 * @return {boolean}
 */
function nearBorder(x, y) {
  let radius = nodeDiameter / 2;

  // distance to each border
  let distance = { left: x, top: y, right: width - x, bottom: height - y };

  // check if any of the border distances are smaller than radius
  if (
    distance.left <= radius ||
    distance.top <= radius ||
    distance.right <= radius ||
    distance.bottom <= radius
  )
    return true;

  return false;
}
