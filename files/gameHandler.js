let paused = false;
let currentQuestion = ["kerttulinmaki", ""];
let selectedAnswers = "";

function preload() {

  let date = new Date();
  let hours = date.getHours();
  if (hours >= 18 || hours < 8) { mapimg = loadImage("images/mapnight.png"); }
  else { mapimg = loadImage("images/mapday.png"); }

  correctsound = new Audio("audio/correct.mp3");
  incorrectsound = new Audio("audio/incorrect.mp3");

  hillData = JSON.parse(atob(localStorage.getItem("hillData")));

}

function setup() {
  
  resizeCanvas(windowWidth, windowHeight);
  frameRate(60);
  noCursor();

  setupButtons();

  center = createVector(-2000, -1000);
  
}

function draw() {
  
  background(0);

  translate(center.x, center.y);
  image(mapimg, 0, 0);

  updateButtons();

  if (!paused) {
    if(mouseIsPressed) {
      center = mouseDrag(center);
    }
    drawNewCursor();
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
  hillbtn2.mouseClicked(() => {hillOnclick("puolalanmaki")});

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
  hillbtn6.mouseClicked(() => {hillOnclick("vartiovuorenmaki")});

  hillbtn7 = createButton("Yliopistonmäki");
  hillbtn7.class("hillbtn");
  hillbtn7.mouseClicked(() => {hillOnclick("yliopistonmaki")});

}

function hillOnclick(hill){

  currentQuestion = [hill, currentQuestion[1]];

  let name = hill.replace("maki", "mäki");
  name = name.charAt(0).toUpperCase() + name.slice(1);
  document.getElementById("hud").style.display = "block";
  document.getElementById("currenthill").innerHTML = name;

  document.getElementById("questionbox").style.display = "block";
  document.getElementById("textanswerdiv").style.display = "none";
  document.getElementById("choiceanswerdiv").style.display = "none";

  let letters = "ABCDEFG";
  for (let i = 0; i < letters.length; i++) {
    let solved = hillData["hills"][hill][letters[i]]["solved"];
    let unlocked = hillData["hills"][hill][letters[i]]["unlocked"];
    let btn = document.getElementById("btn" + letters[i]);
    btn.style.boxShadow = "none";

    if (unlocked && !solved) { btn.style.backgroundColor = "white"; btn.style.borderColor = "white"; }
    else if (!unlocked) { btn.style.backgroundColor = "lightgray"; btn.style.borderColor = "lightgray"; }
    else if (solved) { btn.style.backgroundColor = "lightgreen"; btn.style.borderColor = "lightgreen"; }
  }

  currentQuestion = [currentQuestion[0], ""];

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

  document.getElementById("settingsdiv").style.display = "block";
  document.getElementById("settingstext").style.opacity = "100";
  document.getElementById("blurdiv").style.backdropFilter = "blur(25px)"
  paused = true;
  
}

function closeSettings() {

  document.getElementById("settingstext").style.opacity = "0";
  document.getElementById("blurdiv").style.backdropFilter = "blur(0px)"
  paused = false;

  setTimeout(function() {
    document.getElementById("settingsdiv").style.display = "none";
  }, 750);

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

        hillData["score"] += 10;

        let chars = "ABCDEFG";
        let unlockQuestion = chars[chars.indexOf(currentQuestion[1]) + 1];
        hillData["hills"][currentQuestion[0]][currentQuestion[1]]["solved"] = true;
        document.getElementById("btn" + currentQuestion[1]).style.backgroundColor = "lightgreen";
        document.getElementById("btn" + currentQuestion[1]).style.borderColor = "lightgreen";
        document.getElementById("btn" + currentQuestion[1]).style.boxShadow = "none";

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

        if (checkComplete()) { window.open("completed.html", "_self"); }

        correctsound.currentTime=0;
        correctsound.play();

      }
      else {
        if ((hillData["score"] - 2) > 0) { hillData["score"] -= 2; }
        else { hillData["score"] = 0; }
        localStorage.setItem("hillData", btoa(JSON.stringify(hillData)));
        console.log(hillData["score"]);
        incorrectsound.currentTime=0;
        incorrectsound.play();
      }
    }

    else {
      let iscorrect = choiceCorrect(hillData["hills"][currentQuestion[0]][currentQuestion[1]]["answer"], selectedAnswers);
      if (iscorrect) {

        hillData["score"] += 10;

        let chars = "ABCDEFG";
        let unlockQuestion = chars[chars.indexOf(currentQuestion[1]) + 1];
        hillData["hills"][currentQuestion[0]][currentQuestion[1]]["solved"] = true;
        document.getElementById("btn" + currentQuestion[1]).style.backgroundColor = "lightgreen";
        document.getElementById("btn" + currentQuestion[1]).style.borderColor = "lightgreen";
        document.getElementById("btn" + currentQuestion[1]).style.boxShadow = "none";

        if (unlockQuestion !== undefined) {
          hillData["hills"][currentQuestion[0]][unlockQuestion]["unlocked"] = true;
          document.getElementById("btn" + unlockQuestion).style.backgroundColor = "white";
          document.getElementById("btn" + unlockQuestion).style.borderColor = "white";
        }

        localStorage.setItem("hillData", btoa(JSON.stringify(hillData)));
        document.getElementById("choicebtna").style.color = "lightgray";
        document.getElementById("choicebtnb").style.color = "lightgray";
        document.getElementById("choicebtnc").style.color = "lightgray";
        document.getElementById("choicebtnd").style.color = "lightgray";

        currentQuestion = [currentQuestion[0], ""];
        document.getElementById("textanswerdiv").style.display = "none";
        document.getElementById("choiceanswerdiv").style.display = "none";

        if (checkComplete()) { window.open("completed.html", "_self"); }

        correctsound.currentTime=0;
        correctsound.play();

      }
      else {
        if ((hillData["score"] - 2) > 0) { hillData["score"] -= 2; }
        else { hillData["score"] = 0; }
        localStorage.setItem("hillData", btoa(JSON.stringify(hillData)));
        console.log(hillData["score"]);
        incorrectsound.currentTime=0;
        incorrectsound.play();
      }
    }

  }

}

function selectQuestion(question) {

  if (hillData["hills"][currentQuestion[0]][question]["unlocked"] && !hillData["hills"][currentQuestion[0]][question]["solved"]) {

    if (currentQuestion[1] != question && !hillData["hills"][currentQuestion[0]][question]["solved"]) {
      currentQuestion = [currentQuestion[0], question];
      document.getElementById("btn" + question).style.boxShadow = "0px 0px 20px #c9b271";
      
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

function loadMainMenu() {

  document.getElementById("settingstext").style.opacity = "0";

  setTimeout(function() {
      window.open("menu.html", "_self");
  }, 750);

}

function checkComplete() {

  let ihills = ["samppalinnanmaki", "kakolanmaki", "vartiovuorenmaki", "puolalanmaki", "kerttulinmaki", "aninkaistenmaki", "yliopistonmaki"];
  for (let i = 0; i < ihills.length; i++) {
    if (!hillData["hills"][ihills[i]]["G"]["solved"]) { return false; }
  }
  return true;

}

function loadGuide() {

  document.getElementById("settingstext").style.opacity = "0";

  setTimeout(function() {
      window.open("guide.html", "_self");
  }, 750);
}