
(function(){
//bank of words that player will try to guess
let wordBank = ["modest mouse", "duster", "american football", "sebadoh", "the flaming lips", "galaxie 500", "pavement", "built to spill",
                "digible planets", "outkast", "wu tang clan", "aphex twin", "bjork", "boards of canada", "slowdive", "my bloody valentine",
                "flake music", "guided by voices", "dj shadow", "pj harvey", "weezer", "radiohead", "yo la tengo", "nirvana", "stereolab",
                "pinback", "at the drive in", "they might be giants", "disco inferno", "polvo", "slint", "capn jazz", "elliott smith",
                "the american analog set", "red hot chili peppers"];
let fileName = {"modest mouse":"this-is-a-long-drive.jpg", "duster": "stratosphere-cover.jpg", "american football":"american-football.jpg",
                "sebadoh":"sebadoh-iii.jpg", "the flaming lips":"soft-bulletin.jpg", "galaxie 500":"on-fire.jpg", "pavement":"slanted-and-enchanted.jpg", 
                "built to spill":"keep-it-like-a-secret.jpg", "digible planets":"reachin.jpg", "outkast":"atliens.jpeg", "wu tang clan":"enter-the-wu-tang.jpg", 
                "aphex twin":"richard-d-james.jpg", "bjork":"post.jpg", "boards of canada":"twoism.jpg", "slowdive":"souvlaki.jpg", "my bloody valentine":"loveless.jpg",
                "flake music":"when-you-land.jpg", "guided by voices":"bee-thousand.png", "dj shadow":"endtroducing.jpg", "pj harvey":"rid-of-me.jpg", "weezer":"blue-album.jpg",
                "radiohead":"ok-computer.jpg", "yo la tengo":"i-can-hear.jpg", "nirvana":"in-utero.jpg", "stereolab":"dots-and-loops.jpg", "pinback":"pinback.jpg",
                "at the drive in":"relationship-of-command.jpg", "they might be giants":"lincoln.jpg", "disco inferno":"disco-inferno.jpg", "polvo":"exploded-drawing.jpg",
                "slint":"spiderland.jpg", "capn jazz":"capn-jazz.jpg", "elliott smith":"either-or.jpg", "the american analog set":"know-by-heart.jpg", "red hot chili peppers":"blood-sugar-sex-magic.jpg"};
                //associate list of letters and ASCII numbers
let letters = { 0:48, 1:49, 2:50, 3:51, 4:52, 5:53, 6:54, 7:55, 8:56, 9:57, a:65, b:66, c:67, d:68, e:69, f:70, g:71, h:72,
                i:73, j:74, k:75, l:76, m:77, n:78, o:79, p:80, q:81, r:82, s:83, t:84, u:85, v:86, w:87, x:88, y:89, z:90}
//used to check if the initial screen has been set up 
let setup = false;
//set to true when the user get the answer correct
let correct = false;
//this will be the word the randomly selected from the word bank the user is trying to guess
let gWord = "";
//will store each guess the user makes
let guess = "";
let output = "";
let guessRemaining = 7, wins = 0;
let usedWords = "";
let lettersInWord = "";

document.addEventListener("keyup", function(event){

    if(!setup){
        if(wordBank.length === 0){killScreen();}
        //randomly pick guess Word
        gWord = chooseWord();;
        console.log(gWord);
        //create appropriate number of spaces on screen
        lettersInWord = genLetters(gWord);
        output = set(gWord);
    }
    else if(setup){
        guess = getLetter(event.which);
        //find where guess is in gWord
        if(!usedWords.includes(guess) && guess != " "){
            makeGuess(gWord, guess, output);
            if(guessRemaining === 0){
                revealWord(gWord);
                endGame();
            }
            else if(lettersInWord.length === 0){
                correct = true;
                endGame();
            }
        }
        else if(usedWords.includes(guess)){document.querySelector(".instructions").innerHTML = "You have already guessed that letter.";}
        else{document.querySelector(".instructions").innerHTML = "You have entered an unacceptable character.";}
    }

})    

const makeGuess = (gWord, guess, output) => {
    usedWords += guess;
    if(!(gWord.includes(guess))){
        guessRemaining--;
        document.querySelector(".instructions").innerHTML = "The word does not contain: " + guess;
        outputUsedWords(usedWords);
        document.querySelector(".wins-guesses").innerHTML = "Wins: " + wins + ", Guesses Remaining: " + guessRemaining;
        return;
    }
    else{
        for(let i = 0; i < gWord.length; i++){
            if(gWord.charAt(i) === guess){
                output[i] = guess;
            }
        }
        lettersInWord = lettersInWord.replace(guess, "");
        drawWord(output);
        return;
    }
}

const set = (gWord) => {
    let underscores = "";
    let source = "assets/images/";
    for(let i = 0; i < gWord.length; i++){
        if(gWord.charAt(i) === " "){underscores += "-- ";}
        else{underscores += "_ ";}
    }
    for(key in fileName){
        console.log("key: " + key);
        console.log("gWord: " + gWord);
        console.log("source: " + fileName[key]);
        if(key === gWord){source += fileName[key];}
    }
    document.querySelector(".album").innerHTML = "<img class = \"album-art\" src = \"" + source + "\" >";
    document.querySelector(".wins-guesses").innerHTML = "Wins: " + wins + ", Guesses Remaining: " + guessRemaining;
    document.querySelector(".used-words").innerHTML = "";  
    document.querySelector(".instructions").innerHTML = "";   

    setup = true;  

    underscores = underscores.split(" ");
    drawWord(underscores); 
    return underscores;
}

const genLetters = (word) => {
    let l = "";
    arr = word.split("");
    for(let i = 0; i < arr.length; i++){
        if(!(l.includes(arr[i])) && arr[i] !== " "){l += arr[i];}
    }
    return l;
}

const getLetter = (which) => {
    if(which === 32){return " ";}
    for( key in letters ){
        if(letters[key] === which){return key;}
    }
    console.log("Not found");
    return "#";
}

const revealWord = (gWord) => {
    outP = "";
    for(let i = 0; i < gWord.length; i++){
        if(gWord[i] === " "){outP += "&nbsp;&nbsp;&nbsp;";}
        else{outP += gWord[i] + " ";}
    }
    document.querySelector(".unknown-word").innerHTML = outP;
}

const endGame = () => {
    if(correct){
        wins += 1;
        document.querySelector(".wins-guesses").innerHTML = "Wins: " + wins + ", Guesses Remaining: " + guessRemaining;
        document.querySelector(".instructions").innerHTML = "You Win! Press any key to play another game.";  
    }
    else{
        document.querySelector(".instructions").innerHTML = "Bummer, you lost :( ... Press any key to play another game.";  
    }
    setup = false;
    guessRemaining = 7;
    correct = false;
    gWord = "";
    guess = "";
    lettersInWord = "";
    usedWords = "";
    return;
}

const outputUsedWords = (uW) => {
    outUsed = "";
    for(let i = 0; i < uW.length; i++){
        if(!gWord.includes(uW.charAt(i))){outUsed += uW.charAt(i) + ", ";}
    }
    document.querySelector(".used-words").innerHTML = outUsed.slice(0, outUsed.length - 2); 
    return;
}

const drawWord = (outP) => {
    draw = "";
    for(let i = 0; i < outP.length; i++){
        if(outP[i] === "--"){draw += "&nbsp;&nbsp;&nbsp;";}
        else{draw += outP[i] + " ";}
    }
    document.querySelector(".unknown-word").innerHTML = draw;
    return;
}

const chooseWord = () => {
    let word = wordBank[Math.floor(Math.random() * wordBank.length)];
    wordBank.splice(wordBank.indexOf(word), 1);
    return word;
}

const killScreen = () => {
    document.querySelector(".wins-guesses").innerHTML = ""; 
    document.querySelector(".unknown-word").innerHTML = "Wowee"; 
    document.querySelector(".instructions").innerHTML = "There are no more words to guess!";   
    document.querySelector(".used-words").innerHTML = "You win!"; 

}

}())
