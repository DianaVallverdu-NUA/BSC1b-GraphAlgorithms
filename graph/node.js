const nodeDiameter = 50;

class Node {

  selected = false;
  neighbours = [];

  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
  }

  addNeighbour(neighbourId) {
    // check if neighbour already exists
    if(this.neighbours.includes(neighbourId)) {
      // get index of neighbour in my neighbours array
      let neighbourIndex = this.neighbours.indexOf(neighbourId);

      // remove neighbour
      this.neighbours.splice(neighbourIndex, 1);
      return;
    }

    this.neighbours.push(neighbourId);
  }
}