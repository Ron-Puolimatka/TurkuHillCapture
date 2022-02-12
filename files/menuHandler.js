function setup() {
  
  resizeCanvas(windowWidth, windowHeight);
  noCursor(); 
  
}

function draw() {
  
  background(0);
  drawNewCursor();
  
}

function windowResized() {
  
  resizeCanvas(windowWidth, windowHeight);

}

function drawNewCursor() {
  
  stroke(255);
  
  if (mouseIsPressed) {
    strokeWeight(10);
  }
  else {
    strokeWeight(5);
  }
    
  point(mouseX, mouseY);
  line(mouseX, mouseY, pmouseX, pmouseY);
  
}

function loadNewGame() {

  window.open("game.html", "_self");

}