class Graph {
  nodes = [];
  #currentlySelectedId = -1;

  // public functions

  /**
   * called when the mouse is clicked anywhere
   * @param {Number} x
   * @param {Number} y
   */
  onClick(x, y) {
    // if out of bounds, return
    if (outOfBounds(x, y) || nearBorder(x, y)) return;

    // if coordinates are inside an existing node
    let selectedNode = this.#insideNode(x, y);

    if (selectedNode) {
      // case 1 - there is a selected node
      if (this.#currentlySelectedId != -1) {
        const selectedId = this.nodes.indexOf(selectedNode);
        this.#addEdge(this.#currentlySelectedId, selectedId);
        return;
      }

      // case 2 - there is no selected node
      this.#selectNode(selectedNode);
      return;
    }

    // unselect node if anything selected
    this.#unselectNode();

    if (this.#overlappingNode(x, y)) return;

    const newNode = new Node(x, y, this.nodes.length);
    this.nodes.push(newNode);
  }

  /**
   * called at every main sketch draw
   */
  draw() {
    //update node values
    for (let node of this.nodes) {
      node.calculateVelocity(this.nodes);
      node.move();
    }

    this.#drawNodes();
    this.#drawEdges();
  }

  // =================== Drawing Functions ===================

  #selectNode(nodeId) {
    this.#currentlySelectedId = this.nodes.indexOf(nodeId);
    this.nodes[this.#currentlySelectedId].selected = true;
    selectedNodeSpan.innerHTML = this.#currentlySelectedId;
    selectedNodeDegreeSpan.innerHTML = this.nodes[this.#currentlySelectedId].neighbours.length;
  }

  #unselectNode() {
    if(this.#currentlySelectedId == -1) return;
    this.nodes[this.#currentlySelectedId].selected = false;
    this.#currentlySelectedId = -1;
    selectedNodeSpan.innerHTML = '';
    selectedNodeDegreeSpan.innerHTML = '';
  }

  /**
   * Check if (x, y) is inside another node
   * @param {Number} x
   * @param {Number} y
   * @return {boolean}
   */
  #insideNode(x, y) {
    let radius = nodeDiameter / 2;

    for (let node of this.nodes) {
      if (squareDistance(x, y, node.x, node.y) < radius ** 2) return node;
    }
    return false;
  }

  /**
   * Check if creating a node in (x, y) would make a node that overlaps with another node
   * @param {Number} x
   * @param {Number} y
   * @return {boolean}
   */
  #overlappingNode(x, y) {
    for (let node of this.nodes) {
      if (squareDistance(x, y, node.x, node.y) < nodeDiameter ** 2) {
        return true;
      }
    }
    return false;
  }

  /**
   * draw all nodes that in canvas
   */
  #drawNodes() {
    for (let node of this.nodes) {
      fill(0, 0, 255);

      if (node.selected) {
        fill(0, 255, 0);
      }
      circle(node.x, node.y, nodeDiameter);
    }
  }

  /**
   * draw all edges on canvas
   */
  #drawEdges() {
    for (let node of this.nodes) {
      for (let neighbourId of node.neighbours) {
        let neighbourNode = this.nodes[neighbourId];
        line(node.x, node.y, neighbourNode.x, neighbourNode.y);
      }
    }
  }

  // =================== INTERACTIVE ELEMENTS ===================

  /**
   * Add new edge from selected node at positions one and two
   * @param {*} nodeOnePosition
   * @param {*} nodeTwoPosition
   */
  #addEdge(nodeOnePosition, nodeTwoPosition) {
    this.nodes[nodeOnePosition].addNeighbour(nodeTwoPosition);
    this.nodes[nodeTwoPosition].addNeighbour(nodeOnePosition);

    this.#unselectNode();
  }

  /**
   * Add new node at (x, y)
   * @param {Number} x
   * @param {Number} y
   */
  #addNode(x, y) {}
}

let graph = new Graph();
