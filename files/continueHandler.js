//ei valmis
let input;
let InputJSON;

function setup() {
  input = createFileInput(handleFile);
  input.position(0, 0);
}

function draw() {
  background(255);
}

function handleFile(file) {
    if(file.type === 'JSON')
    {
        InputJSON = file;
        window.open("game.html", "_self");
    }
}