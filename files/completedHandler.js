function setup() {

    document.getElementById("totalscore").innerHTML = JSON.parse(atob(localStorage.getItem("hillData")))["score"];

    resizeCanvas(windowWidth, windowHeight);
    noCursor();
  
    center = createVector(-2000, -1000);

}

function preload() {

    let date = new Date();
    let hours = date.getHours();
    if (hours >= 18 || hours < 8) { mapimg = loadImage("images/mapnightblur.png"); }
    else { mapimg = loadImage("images/mapdayblur.png"); }
  
  }
  
  function draw() {
    
    background(0);
  
    translate(center.x, center.y);
    image(mapimg, 0, 0);
    
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
    
    translate(-center.x, -center.y);
    point(mouseX, mouseY);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
  }