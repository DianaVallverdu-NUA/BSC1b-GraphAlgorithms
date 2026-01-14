

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


    // create new node object -> this allows us to access the neighbours array & other props
    let newNode = new Node(x, y, this.nodes.length);

    this.nodes.push(newNode);
  }

  /**
   * called at every main sketch draw
   */
  draw() {
    this.#drawNodes();
    this.#drawEdges();
  }

  /**
   * A graph is complete when all nodes are connected to each other
   * i.e. when all nodes have n - 1 neighbours, where n = number of nodes
   * @returns true if graph is complete, false otherwise 
   */
  isComplete() {
    for(let node of this.nodes) {
      if(node.neighbours.length !== this.nodes.length - 1) {
        return false;
      }
    }

    return true;
  }


  /**
   * @returns -1 if no selected node, or number of neighbours if a node is selected 
   */
  getSelectedNodeDegree() {
    if(this.#currentId === -1) return -1;

    // get selected node & return degree
    let selectedNode = this.nodes[this.#currentId];
    return selectedNode.neighbours.length;
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
      for(let neighbourId of node.neighbours) {
        let neighbour = this.nodes[neighbourId];
        line(node.x, node.y, neighbour.x, neighbour.y);
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

    // get node objects
    let nodeOne = this.nodes[nodeOnePosition];
    let nodeTwo = this.nodes[nodeTwoPosition];

    // add as neighoburs
    nodeOne.addNeighbour(nodeTwoPosition);
    nodeTwo.addNeighbour(nodeOnePosition);

  }

  #deselectNode() {
    if(this.#currentId == -1) return;
    this.nodes[this.#currentId].selected = false; // mark node as not selected
    this.#currentId = -1;
  }

}
