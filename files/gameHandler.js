let paused = false;
let currentQuestion = ["kerttulinmaki", ""];
let selectedAnswers = "";

function preload() {

  let date = new Date();
  let hours = date.getHours();
  if (hours >= 18 || hours < 8) { mapimg = loadImage("images/mapnight.png"); }
  else { mapimg = loadImage("images/mapday.png"); }

  hillData = JSON.parse(atob(localStorage.getItem("hillData")));

}

function setup() {
  
  resizeCanvas(windowWidth, windowHeight);
  frameRate(60);
  noCursor();

  setupButtons();

  center = createVector(-2000, -1000);

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
  if (!mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  
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
  hillbtn1.mouseClicked(() => {hillOnclick("kerttulinmaki")});

  hillbtn2 = createButton("Puolalanmäki");
  hillbtn2.class("hillbtn");
  hillbtn2.mouseClicked(() => {hillOnclick("puolalanmäki")});

  hillbtn3 = createButton("Aninkaistenmäki");
  hillbtn3.class("hillbtn");
  hillbtn3.mouseClicked(() => {hillOnclick("aninkaistenmaki")});

  hillbtn4 = createButton("Kakolanmäki");
  hillbtn4.class("hillbtn");
  hillbtn4.mouseClicked(() => {hillOnclick("kakolanmaki")});

  hillbtn5 = createButton("Samppalinnanmäki");
  hillbtn5.class("hillbtn");
  hillbtn5.mouseClicked(() => {hillOnclick("samppalinnanmaki")});

  hillbtn6 = createButton("Vartiovuorenmäki");
  hillbtn6.class("hillbtn");
  hillbtn6.mouseClicked(() => {hillOnclick("variovuorenmaki")});

  hillbtn7 = createButton("Yliopistonmäki");
  hillbtn7.class("hillbtn");
  hillbtn7.mouseClicked(() => {hillOnclick("yliopistonmaki")});

}

function hillOnclick(hill){

  currentQuestion = [hill, currentQuestion[1]];
  document.getElementById("questionbox").style.display = "block";

  let letters = "ABCDEFG";
  for (let i = 0; i < letters.length; i++) {
    let solved = hillData["hills"][hill][letters[i]]["solved"];
    let unlocked = hillData["hills"][hill][letters[i]]["unlocked"];
    let btn = document.getElementById("btn" + letters[i]);

    if (unlocked && !solved) { btn.style.backgroundColor = "white"; btn.style.borderColor = "white"; }
    else if (!unlocked) { btn.style.backgroundColor = "lightgray"; btn.style.borderColor = "lightgray"; }
    else if (solved) { btn.style.backgroundColor = "lightgreen"; btn.style.borderColor = "lightgreen"; }
  }

}

function updateButtons() {
  
  hillbtn1.position(center.x - hillbtn1.size().width / 2 + 3491, center.y - hillbtn1.size().height / 2 + 1335);
  hillbtn2.position(center.x - hillbtn2.size().width / 2 + 2747, center.y - hillbtn2.size().height / 2 + 1070);
  hillbtn3.position(center.x - hillbtn3.size().width / 2 + 2988, center.y - hillbtn3.size().height / 2 + 991);
  hillbtn4.position(center.x - hillbtn4.size().width / 2 + 2121, center.y - hillbtn4.size().height / 2 + 1802);
  hillbtn5.position(center.x - hillbtn5.size().width / 2 + 2985, center.y - hillbtn5.size().height / 2 + 1600);
  hillbtn6.position(center.x - hillbtn6.size().width / 2 + 3242, center.y - hillbtn6.size().height / 2 + 1456);
  hillbtn7.position(center.x - hillbtn7.size().width / 2 + 3474, center.y - hillbtn7.size().height / 2 + 957);

}

function hideQuestionBtn(question) {

  var btn = document.getElementById("btn" + question);
  btn.style.display = "none";

}

function showQuestion(question) {

  let hill = currentQuestion[0];

  let unlocked = hillData["hills"][hill][question]["unlocked"];

  var btn = document.getElementById("btn" + question);
  if (unlocked) {
    btn.innerHTML = hillData["hills"][hill][question]["question"];
    btn.style.transitionDelay = "0.25s, 0s";
    btn.style.height = "80px";
    btn.style.width = "300px";
    btn.style.textAlign = "left";
  }

}

function resetQuestion(question) {

  if (currentQuestion != question) {
    var btn = document.getElementById("btn" + question);
    btn.innerHTML = question;
  }

}

function openSettings() {
  
}

function rateAnswer(hill, question, input) {

  let string = hillData["hills"][hill][question]["answer"];
  if (mistakePrecentage(string, input)) {
    return true;
  }
  return false;

}

function activateChoice(choice) {

  choice = choice.toLowerCase();
  let btn = document.getElementById("choicebtn" + choice);

  if (!selectedAnswers.includes(choice)) {
    selectedAnswers += choice;
    btn.style.color = "black";
  }
  else {
    selectedAnswers = selectedAnswers.replace(choice, "");
    btn.style.color = "lightgray";
  }

}

function checkAnswer() {

  if (!hillData["hills"][currentQuestion[0]][currentQuestion[1]]["solved"]) {

    let input = document.getElementById("answerinput").value;
    let questiontype = hillData["hills"][currentQuestion[0]][currentQuestion[1]]["type"];
    
    if (questiontype == 0) {
      let iscorrect = rateAnswer(currentQuestion[0], currentQuestion[1], input);

      if (iscorrect) {

        let chars = "ABCDEFG";
        let unlockQuestion = chars[chars.indexOf(currentQuestion[1]) + 1];
        hillData["hills"][currentQuestion[0]][currentQuestion[1]]["solved"] = true;
        document.getElementById("btn" + currentQuestion[1]).style.backgroundColor = "lightgreen";
        document.getElementById("btn" + currentQuestion[1]).style.borderColor = "lightgreen";

        if (unlockQuestion !== undefined) {
          hillData["hills"][currentQuestion[0]][unlockQuestion]["unlocked"] = true;
          document.getElementById("btn" + unlockQuestion).style.backgroundColor = "white";
          document.getElementById("btn" + unlockQuestion).style.borderColor = "white";
        }

        localStorage.setItem("hillData", btoa(JSON.stringify(hillData)));
        document.getElementById("answerinput").value = "";

        currentQuestion = [currentQuestion[0], ""];
        document.getElementById("textanswerdiv").style.display = "none";
        document.getElementById("choiceanswerdiv").style.display = "none";

      }
    }

    else {
      let iscorrect = choiceCorrect(hillData["hills"][currentQuestion[0]][currentQuestion[1]]["answer"], selectedAnswers);
      if (iscorrect) {

        let chars = "ABCDEFG";
        let unlockQuestion = chars[chars.indexOf(currentQuestion[1]) + 1];
        hillData["hills"][currentQuestion[0]][currentQuestion[1]]["solved"] = true;
        document.getElementById("btn" + currentQuestion[1]).style.backgroundColor = "lightgreen";
        document.getElementById("btn" + currentQuestion[1]).style.borderColor = "lightgreen";

        if (unlockQuestion !== undefined) {
          hillData["hills"][currentQuestion[0]][unlockQuestion]["unlocked"] = true;
        }

        localStorage.setItem("hillData", btoa(JSON.stringify(hillData)));
        document.getElementById("choicebtna").style.color = "lightgray";
        document.getElementById("choicebtnb").style.color = "lightgray";
        document.getElementById("choicebtnc").style.color = "lightgray";
        document.getElementById("choicebtnd").style.color = "lightgray";

        currentQuestion = [currentQuestion[0], ""];
        document.getElementById("textanswerdiv").style.display = "none";
        document.getElementById("choiceanswerdiv").style.display = "none";

      }
    }

  }

}

function selectQuestion(question) {

  if (hillData["hills"][currentQuestion[0]][question]["unlocked"]) {

    if (currentQuestion[1] != question && !hillData["hills"][currentQuestion[0]][question]["solved"]) {
      currentQuestion = [currentQuestion[0], question];
      document.getElementById("btn" + question).style.boxShadow = "0px 0px 20px lightgray";
      
      if (hillData["hills"][currentQuestion[0]][question]["type"] == 0) {
        let element = document.getElementById("textanswerdiv");
        element.style.display = "block";
      }
      else {
        let element = document.getElementById("choiceanswerdiv")
        element.style.display = "block";
      }
    }
    else {
      currentQuestion = [currentQuestion[0], ""];
      document.getElementById("btn" + question).style.boxShadow = "none";
      document.getElementById("textanswerdiv").style.display = "none";
      document.getElementById("choiceanswerdiv").style.display = "none";
    }

    let letters = "ABCDEFG".replace(question, "");
    for (let i = 0; i < letters.length; i++) {
      document.getElementById("btn" + letters[i]).style.borderColor = document.getElementById("btn" + letters[i]).style.backgroundColor;
    }
  }
}