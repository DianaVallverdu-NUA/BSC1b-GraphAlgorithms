const nodeDiameter = 50;

class Node {
  selected = false;
  neighbours = [];

  #vel = { x: 0, y: 0 };

  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
  }

  addNeighbour(nodeId) {
    
    // if node in neighbours -> remove edge
    if (this.neighbours.includes(nodeId)) {
      let index = this.neighbours.indexOf(nodeId);
      this.neighbours.splice(index, 1);
      console.log(this.neighbours);
      return;
    }

    // if node not in neighbours -> add edge
    this.neighbours.push(nodeId);
  }

  move() {
    if (nearBorder(this.x, this.y)) return;

    if (abs(this.#vel.x) < 1.5 && abs(this.#vel.y) < 1.5) return;

    this.x = this.x + this.#vel.x;
    this.y = this.y + this.#vel.y;
  }

  calculateVelocity(nodes) {
    this.#vel = { x: 0, y: 0 };

    for (let node of nodes) {
      // skip themselves
      if (node.x == this.x || node.y == this.y) continue;

      // only relevant if nearby
      if (squareDistance(node.x, node.y, this.x, this.y) > 30000) continue;

      // square dist as measure of strength
      const factor = 100 / squareDistance(node.x, node.y, this.x, this.y);

      // calculate strength
      const force = {
        x: (this.x - node.x) * factor,
        y: (this.y - node.y) * factor,
      };

      // vel = force for now
      this.#vel.x += force.x;
      this.#vel.y += force.y;
    }

    // add vertical / horizontal force
    let vertical = height / 2 - this.y;
    if (abs(vertical) < 250) {
      vertical = 0;
    }
    let horizontal = width / 2 - this.x;
    if (abs(horizontal) < 250) {
      horizontal = 0;
    }

    this.#vel.x += horizontal * 0.01;
    this.#vel.y += vertical * 0.01;
  }
}
