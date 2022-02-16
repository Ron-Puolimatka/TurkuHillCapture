function mistakePrecentage(string, input) {

    let correct = 0;
    let mistakes = 0;

    let letters = removeDuplicateLetters(input);

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

    return mistakes / correct;

}

// (string.match(/o/g)||[]).length;

function removeDuplicateLetters(string) {
    return string
      .split('')
      .filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      })
      .join('');
}