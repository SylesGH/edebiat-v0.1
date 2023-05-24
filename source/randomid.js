var letters = "abcdefghijklmnoprstuvyzqwx"
var capitalLetters = "ABCDEFGHIJKLMNOPRSTUVYZQWX"
var letters = letters.split("")
var capitalLetters = capitalLetters.split("")
var randomKey = []

function getRandomKey() {
    for (let i = 0; i < 5; i++) {
        randomKey += letters.concat(capitalLetters)[Math.floor(Math.random() * letters.concat(capitalLetters).length)]
    }
    console.log(randomKey);
    randomKey = []
}