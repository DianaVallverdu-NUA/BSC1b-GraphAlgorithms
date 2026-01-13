
/**
 * Calculate the square of the euclidean distance between two points
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @returns 
 */
function squareDistance(x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

/**
  * Check if (x, y) is outside canvas bounds
  * @param {Number} x 
  * @param {Number} y 
  * @return {boolean}
  */
function outOfBOunds(x, y) {
  let outisde = false;
  if (x < 0 || x > width || y < 0 || y > height) outisde = true;
  return outisde;
}

/**
 *   Check if x, y is near a border of the canvass
  * @param {Number} x
  * @param {Number} y
  * @return {boolean}
  */
function nearBorder(x, y) {
  let radius = nodeDiameter / 2;

  // distance to each border
  let distance = { left: x, top: y, right: width - x, bottom: height - y }

  // check if any of the border distances are smaller than radius
  let near = false
  if (distance.left <= radius || distance.top <= radius ||
    distance.right <= radius || distance.bottom <= radius) near = true

  return near;

}