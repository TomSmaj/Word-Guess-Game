
(function(){

let artist = [
    {name:"modest mouse", pic:"this-is-a-long-drive.jpg"},
    {name:"duster", pic:"stratosphere-cover.jpg"},
    {name:"american football", pic:"american-football.jpg"},
    {name:"sebadoh", pic:"sebadoh-iii.jpg"},
    {name:"the flaming lips", pic:"soft-bulletin.jpg"},
    {name:"galaxie 500", pic:"on-fire.jpg"},
    {name:"pavement", pic:"slanted-and-enchanted.jpg"}, 
    {name:"built to spill", pic:"keep-it-like-a-secret.jpg"},
    {name:"digible planets", pic:"reachin.jpg"},
    {name:"outkast", pic:"atliens.jpeg"},
    {name:"wu tang clan", pic:"enter-the-wu-tang.jpg"}, 
    {name:"aphex twin", pic:"richard-d-james.jpg"},
    {name:"bjork", pic:"post.jpg"},
    {name:"boards of canada", pic:"twoism.jpg"},
    {name:"slowdive", pic:"souvlaki.jpg"},
    {name:"my bloody valentine", pic:"loveless.jpg"},
    {name:"flake music", pic:"when-you-land.jpg"},
    {name:"guided by voices", pic:"bee-thousand.png"},
    {name:"dj shadow", pic:"endtroducing.jpg"},
    {name:"pj harvey", pic:"rid-of-me.jpg"},
    {name:"weezer", pic:"blue-album.jpg"},
    {name:"radiohead", pic:"ok-computer.jpg"},
    {name:"yo la tengo", pic:"i-can-hear.jpg"},
    {name:"nirvana", pic:"in-utero.jpg"},
    {name:"stereolab", pic:"dots-and-loops.jpg"},
    {name:"pinback", pic:"pinback.jpg"},
    {name:"at the drive in", pic:"relationship-of-command.jpg"},
    {name:"they might be giants", pic:"lincoln.jpg"},
    {name:"disco inferno", pic:"disco-inferno.jpg"},
    {name:"polvo", pic:"exploded-drawing.jpg"},
    {name:"slint", pic:"spiderland.jpg"},
    {name:"capn jazz", pic:"capn-jazz.jpg"},
    {name:"elliott smith", pic:"either-or.jpg"},
    {name:"the american analog set", pic:"know-by-heart.jpg"},
    {name:"red hot chili peppers", pic:"blood-sugar-sex-magic.jpg"},
    {name:"cocteau twins", pic:"heaven-or-las-vegas.png"}
];


//associate list of letters and ASCII numbers
//use event.key to avoid havving to use ASCII code
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
let guessRemaining = 8, wins = 0;
let usedWords = "";
let lettersInWord = "";

document.addEventListener("keyup", function(event){

    if(!setup){
        if(artist.length === 0){killScreen();}
        //randomly pick guess Word
        gWord = chooseWord();
        console.log(gWord);
        //create appropriate number of spaces on screen
        lettersInWord = genLetters(gWord);
        output = set(gWord);
    }
    else if(setup){
        guess = event.key;
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
        document.querySelector(".instructions").innerHTML = "The band name does not contain: " + guess;
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
    let found = false;
    let j = 0;
    while(!found){
        if(artist[j].name === gWord){
            source += artist[j].pic;
            document.querySelector(".album").innerHTML = "<img class = \"album-art\" src = \"" + source + "\" >";
            artist.splice(j, 1);
            found = true;
        }
        else{j++;}
    }

    
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
        document.querySelector(".instructions").innerHTML = "Correct! Press any key to keep playing.";  
    }
    else{
        document.querySelector(".instructions").innerHTML = "Bummer, you lost :( ... Press any key to keep playing.";  
    }
    setup = false;
    guessRemaining = 8;
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
    let word = artist[Math.floor(Math.random() * artist.length)];
    return word.name;
}

const killScreen = () => {
    document.querySelector(".wins-guesses").innerHTML = "Wins: " + wins; 
    document.querySelector(".unknown-word").innerHTML = "Wowee"; 
    document.querySelector(".instructions").innerHTML = "There are no more bands to guess!";   
    document.querySelector(".used-words").innerHTML = "You win!"; 

}

}())
