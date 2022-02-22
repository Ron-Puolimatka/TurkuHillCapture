function setup() {
  
    resizeCanvas(windowWidth, windowHeight);
    frameRate(60);
    noCursor();

    document.getElementById("loadbtns").style.opacity = "100";
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
    
    translate(0, 0);
    point(mouseX, mouseY);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
}
function loadMainMenu() {

    document.getElementById("loadbtns").style.opacity = "0";
  
    setTimeout(function() {
        window.open("menu.html", "_self");
    }, 750);
  
}
