let paused = false;
let currentQuestion = ["kerttulinmaki", "A"];
let selectedAnswers = [];

function preload() {

  mapimg = loadImage("images/placeholdermap.png");
  hillData = JSON.parse(atob(localStorage.getItem("hillData")));

}

function setup() {
  
  resizeCanvas(windowWidth, windowHeight);
  frameRate(60);
  noCursor();

  setupButtons();

  center = createVector(0, 0);

  document.getElementById("transitiondiv").style.opacity = "0";
  setTimeout(function() {
    document.getElementById("transitiondiv").style.width = "0%";
  }, 1000);
  
}

function draw() {
  
  background(0);

  translate(center.x, center.y);
  image(mapimg, 0, 0);

  updateButtons();

  if(mouseIsPressed) {
    center = mouseDrag(center);
  }
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
  
  hillbtn1.position(center.x - hillbtn1.size().width / 2 + 1050, center.y - hillbtn1.size().height / 2 + 375);
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

function openSettings() {
  
}

function rateAnswer(hill, question, input) {

  let string = hillData["hills"][hill][question]["question"];
  if (mistakePrecentage(string, input) < 0.1) {
    return true;
  }
  return false;

}

function checkAnswer() {

  let input = document.getElementById("answerinput").value;
  console.log(input);
  let iscorrect = rateAnswer(currentQuestion[0], currentQuestion[1], input);

  if (iscorrect) {

    let chars = "ABCDEFG";
    let unlockQuestion = chars[chars.indexOf(currentQuestion[1]) + 1];
    hillData["hills"][currentQuestion[0]][currentQuestion[1]]["solved"] = true;

    if (unlockQuestion !== undefined) {
      hillData["hills"][currentQuestion[0]][unlockQuestion]["unlocked"] = true;
    }

    localStorage.setItem("hillData", btoa(JSON.stringify(hillData)));
    document.getElementById("answerinput").value = "";

  }

}