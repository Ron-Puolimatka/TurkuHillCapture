function setup() {

  resizeCanvas(windowWidth, windowHeight);
  noCursor();
  fileLoaded = false;

  document.getElementById("loadbtns").style.left = "0px";

  if (localStorage.getItem("hillData") !== null) {
    window.open("game.html", "_self");
  }

}

function draw() {

  background(0);
  drawNewCursor();
  
  var file = document.getElementById('SaveFile').files[0];
  if (file && !fileLoaded) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(e) {
      localStorage.setItem("hillData", e.target.result);      
      console.log(e.target.result);
      fileLoaded = true;         
      window.open("game.html", "_self");   
    };
  }

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

function loadMainMenu() {

  window.open("menu.html", "_self")

}
