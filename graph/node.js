const nodeDiameter = 50;

class Node {

  selected = false;
  neighbours = [];

  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
  }
}