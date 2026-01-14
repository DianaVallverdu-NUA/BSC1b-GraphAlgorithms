let graph = new Graph();

let completeSpan = document.getElementById("completeSpan");

let degreeSpan = document.getElementById("degreeSpan");

function setup() {
  createCanvas(800, 700);

  strokeWeight(5);
}

function draw() {
  background(220);

  graph.draw();

  // check if graph is complete & change span text accordingly
  if (graph.isComplete()) {
    completeSpan.innerHTML = "";
  } else {
    completeSpan.innerHTML = "not";
  }

  // check if a node is selected & change degree text accordingly
  if(graph.getSelectedNodeDegree() === -1){
    degreeSpan.innerHTML = "";
  } else {
    degreeSpan.innerHTML = graph.getSelectedNodeDegree();
  }
}

function mouseClicked() {
  graph.onClick(mouseX, mouseY);
}
