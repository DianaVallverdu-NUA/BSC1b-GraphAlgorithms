function setup() {
  createCanvas(800, 700);
  frameRate(30);
}

function draw() {
  background(220);

  graph.draw();

  if(graph.isComplete()) {
    completeGraphSpan.innerHTML = '';
  } else {
    completeGraphSpan.innerHTML = 'not';
  }
}

function mouseClicked() {
  graph.onClick(mouseX, mouseY);
}
