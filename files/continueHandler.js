//ei valmis
let input;
let InputJSON;

function setup() {

  resizeCanvas(windowWidth, windowHeight);
  noCursor();

}

function draw() {

  background(0);
  drawNewCursor();
  
  var inputState = document.getElementById("SaveFile");
  if (inputState && inputState.value){
    //set txt value to json
    inputState.value = null;
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