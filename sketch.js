function setup() {
  createCanvas(800, 700);

  strokeWeight(5);
}

function draw() {
  background(220);

  graph.draw();
}

function mouseClicked() {
  graph.onClick(mouseX, mouseY);
}
