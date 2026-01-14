

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
    if (outOfBOunds(x, y) || nearBorder(x, y)) return;
    
    // if coordinates are inside an existing node
    let insideNode = this.#insideNode(x, y);
    
    if (insideNode) {
      if (this.#currentId != -1) {
        
        // this.#currentId contains the previously selected node
        // insideNode contains the newly selected node
        const insideNodeId = this.nodes.indexOf(insideNode);

        // if it's the same node -> desselect and return
        if(this.#currentId === insideNodeId) {
          this.#deselectNode();
          return;
        }

        this.#addEdge(this.#currentId, insideNodeId);
        return;
      }
      
      
      let selectedIndex = this.nodes.indexOf(insideNode);

      //set node to selected
      this.nodes[selectedIndex].selected = true;
      this.#currentId = selectedIndex;
      return;
    }
    
    // check if node is overlapping a previous node
    if(this.#overlappingNode(x, y)) return;

    // desselect any selected node & create a new node
    this.#deselectNode();
    this.nodes.push({ x, y });
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
    for(let node of this.nodes) {
      if(squareDistance(x, y, node.x, node.y) < nodeDiameter ** 2) return node;
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
      circle(node.x, node.y, nodeDiameter)
    }
  }

  /**
   * draw all edges on canvas
   */
  #drawEdges() {
    for (let node of this.nodes) {
      if (node.neighbour) {
        let neighbourNode = this.nodes[node.neighbour];
        line(node.x, node.y, neighbourNode.x, neighbourNode.y)
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

  #deselectNode() {
    if(this.#currentId == -1) return;
    this.nodes[this.#currentId].selected = false; // mark node as not selected
    this.#currentId = -1;
  }

}

let graph = new Graph();