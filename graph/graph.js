

class Graph {
  nodes = [];
  #currentId = -1;

  // public functions

  /**
   * called when the mouse is clicked anywhere
   * @param {Number} x 
   * @param {Number} y 
   */
  onClick(x, y) {

    // if out of bounds, return
    if(this.#outOfBOunds(x, y) || this.#nearBorder(x, y)) return;

    if(this.#currentId != -1) {

      // this.#currentId contains the previously selected node
      // insideNode contains the newly selected nod
      const insideNodeId = this.nodes.indexOf(insideNode);
      this.#addEdge(this.#currentId, insideNodeId)
      return;
    }


    // if coordinates are inside an existing node
    let insideNode = this.#insideNode(x,y);
    
    if(insideNode) {
      let selectedIndex = this.nodes.indexOf(insideNode);
      this.nodes[selectedIndex].selected = true;
      this.#currentId = selectedIndex;
      return;
    }
    
    this.nodes.push({x, y})
  }

  /**
   * called at every main sketch draw
   */
  draw() {
    this.#drawNodes();
    this.#drawEdges();
  }

  // =================== Drawing Functions ===================
  /**
   * Check if (x, y) is outside canvas bounds
   * @param {Number} x 
   * @param {Number} y 
   * @return {boolean}
   */
  #outOfBOunds(x, y) {
    let outisde = false;
    if(x<0 || x>width || y<0 || y>height) outisde = true;
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @return {boolean}
   */
  #nearBorder(x, y) {
    let radius = nodeDiameter / 2;

    // distance to each border
    let distance = {left: x, top: y, right: width - x, bottom: height - y}

    // check if any of the border distances are smaller than radius
    let near = false
    if(distance.left <= radius || distance.top <= radius || 
       distance.right <= radius || distance.top <= radius) near = true

      return near;

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
      if(squareDistance(x,y,node.x,node.y) < radius ** 2) return node;
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
  }

  /**
   * draw all nodes that in canvas
   */
  #drawNodes() {
    for (let node of this.nodes) {
      fill(0,0,255);

      if(node.selected) {
        fill(0,255,0);
      }
      circle(node.x, node.y, nodeDiameter)
    }
  }

  /**
   * draw all edges on canvas
   */
  #drawEdges() {
    for(let node of this.nodes) {
      if(node.neighbour) {
        let neighbourNode = this.nodes[node.neigbour];
        line(node.x,node.y,neighbourNode.x,neighbourNode.y)
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
    this.nodes[nodeOnePosition].neighbour = nodeTwoPosition;
    this.nodes[nodeTwoPosition].neighbour = nodeOnePosition;
  }

  /**
   * Add new node at (x, y)
   * @param {Number} x 
   * @param {Number} y 
   */
  #addNode(x, y) {
    
  }
}

let graph = new Graph();