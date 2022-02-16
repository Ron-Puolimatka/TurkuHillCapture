function preload() {

  hillData = JSON.parse(localStorage.getItem("hillData"));

}

function setup() {
  
  resizeCanvas(windowWidth, windowHeight);
  frameRate(60);
  noCursor();

  setupButtons();

  center = createVector(width / 2, height / 2);

  document.getElementById("transitiondiv").style.opacity = "0";
  setTimeout(function() {
    document.getElementById("transitiondiv").style.width = "0%";
  }, 1000);

  
}

function draw() {
  
  background(0);
  drawNewCursor();

  if(mouseIsPressed) {
    center = mouseDrag(center);
  }
  translate(center.x, center.y);

 updateButtons();

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

function setupButtons() {

  hillbtn1 = createButton("Kerttulinmäki");
  hillbtn1.class("hillbtn");

  hillbtn2 = createButton("Puolalanmäki");
  hillbtn2.class("hillbtn");

}

function updateButtons() {
  
  hillbtn1.position(center.x - hillbtn1.size().width / 2, center.y - hillbtn1.size().height / 2);
  hillbtn2.position(center.x - hillbtn2.size().width / 2 + 100, center.y - hillbtn2.size().height / 2 + 150);

}

function hideQuestionBtn(question) {

  var btn = document.getElementById("btn" + question);
  btn.style.display = "none";

}

function showQuestion(hill, question) {

  var btn = document.getElementById("btn" + question);
  btn.innerHTML = hillData["hills"][hill][question]["question"];

}

function resetQuestion(question) {

  var btn = document.getElementById("btn" + question);
  btn.innerHTML = question;

}
