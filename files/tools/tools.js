function mistakePrecentage(string, input) {

    string = string.toLowerCase();
    input = input.toLowerCase();

    let correct = 0;
    let mistakes = 0;

    string = string.replace("'s", " is").replace("'d", " would").replace("'m", " am").replace("'ll", " will").replace("'re", " are");
    input = input.replace("'s", " is").replace("'d", " would").replace("'m", " am").replace("'ll", " will").replace("'re", " are");

    let letters = removeDuplicateLetters(string);

    for (let i = 0; i < letters.length; i++) {
        let amount = input.split(letters[i]).length-1;
        let correct_amount = string.split(letters[i]).length-1;
        if (amount == correct_amount) {
            correct += amount;
        }
        else if (amount < correct_amount) {
            correct += amount;
            mistakes += correct_amount - amount;
        }
        else if (amount > correct_amount) {
            correct += correct_amount;
            mistakes += amount - correct_amount;
        }
    }

    let precentage = mistakes / correct;
    if (precentage < 0.1) { return true; }
    else { return false; }

}

function removeDuplicateLetters(string) {
    return string
      .split('')
      .filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      })
      .join('');
}

function choiceCorrect(string, input) {
    for (let i = 0; i < string.length; i++) {
        if (!input.includes(string[i])) {
            return false;
        }
    }
    return true;
}

function downloadSaveFile() {
    saveStrings([localStorage.getItem("hillData")], "TMHC_SaveFile.txt");
}

function copyToClipboard(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
 }