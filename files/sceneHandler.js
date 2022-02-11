function setup() {
  
  resizeCanvas(windowWidth, windowHeight);
  noCursor(); 
  
}

function draw() {
  
  background(150, 205, 205);
  drawNewCursor();
  
}

function windowResized() {
  
  resizeCanvas(windowWidth, windowHeight);

}

function drawNewCursor() {
  
  stroke(0);
  
  if (mouseIsPressed) {
    strokeWeight(10);
  }
  else {
    strokeWeight(5);
  }
    
  point(mouseX, mouseY);
  line(mouseX, mouseY, pmouseX, pmouseY);
  
}