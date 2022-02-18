function setup() {
  
  resizeCanvas(windowWidth, windowHeight);
  noCursor();

  document.getElementById("menubtns").style.left = "0px";
  
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
  fetch('defaultData.txt')
  .then(response => response.text())
  .then(data => {
    localStorage.setItem("hillData", atob(data));
  });

  document.getElementById("menubtns").style.left = "-250px";

  setTimeout(function() {
    window.open("game.html", "_self");
  }, 750);

}

function loadContinueMenu() {

  document.getElementById("menubtns").style.left = "-250px";

  setTimeout(function() {
    if (localStorage.getItem("hillData") !== null) {
      window.open("game.html", "_self");
    }
    else {
    window.open("continue.html", "_self");
    }
  }, 750);
}

function loadGuide() {

  document.getElementById("menubtns").style.left = "-250px";
  
  setTimeout(function() {
  window.open("guide.html", "_self");
  }, 750);
}