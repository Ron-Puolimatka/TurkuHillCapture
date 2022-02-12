function setup() {
  
  resizeCanvas(windowWidth, windowHeight);
  frameRate(60);
  noCursor(); 

  center = createVector(width / 2, height / 2);
  
}

function draw() {
  
  background(0);
  drawNewCursor();

  if(mouseIsPressed) {
    center = mouseDrag(center);
  }
  translate(center.x, center.y);

  fill(255);
  strokeWeight(0);
  ellipse(0, 0, 50);
  
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
  
  translate(0, 0);
  point(mouseX, mouseY);
  line(mouseX, mouseY, pmouseX, pmouseY);
  
}

function mouseDrag(center, speed=1) {
  
  //let boundaries = createVector(400, 400);
  let velocity = createVector(pmouseX - mouseX, pmouseY - mouseY);
  let newCenter = createVector(center.x + velocity.x * -speed, center.y + velocity.y * -speed);
  
  //if (newCenter.x > boundaries.x || newCenter.x < -boundaries.x) {
    
  //  let direction = newCenter.x / (1 / newCenter.x);
  //  newCenter = createVector(direction * boundaries.x, newCenter.y);
  //  
  //}
  //
  //if (newCenter.y > boundaries.y || newCenter.y < -boundaries.y) {
  //  
  //  let direction = newCenter.y / (1 / newCenter.y);
  //  newCenter = createVector(newCenter.x , direction * boundaries.y);
  //  
  //}
  
  return newCenter;
  
}