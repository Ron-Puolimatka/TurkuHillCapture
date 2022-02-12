//ei valmis
StyleSheet
let input;
let InputJSON;

function setup() {

  resizeCanvas(windowWidth, windowHeight);
  noCursor();
  input = createFileInput(handleFile);
  input.position(80, 140);

}

function draw() {

  background(0);
  drawNewCursor();

}

function handleFile(file) {
  if(file.type === 'text') {
    window.open("game.html", "_self"); 
  }
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

function loadMainMenu() {

  window.open("menu.html", "_self")

}