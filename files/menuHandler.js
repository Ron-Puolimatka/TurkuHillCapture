function preload() {

  let date = new Date();
  let hours = date.getHours();
  if (hours >= 18 || hours < 8) { mapimg = loadImage("images/mapnightblur.png"); }
  else { mapimg = loadImage("images/mapdayblur.png"); }

}

function setup() {
  
  resizeCanvas(windowWidth, windowHeight);
  noCursor();

  center = createVector(-2000, -1000);

  document.getElementById("menubtns").style.left = "0px";
  
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


function loadNewGame() {
  fetch('defaultData.txt')
  .then(response => response.text())
  .then(data => {
    localStorage.setItem("hillData", data);
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

function loadCredits() {

  document.getElementById("menubtns").style.left = "-250px";
  
  setTimeout(function() {
  window.open("credits.html", "_self");
  }, 750);
}