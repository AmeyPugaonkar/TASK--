// Select the elements
let selectChoice = document.querySelector(".select-choice");
let choiceX = selectChoice.querySelector(".choiceX");
let choiceO = selectChoice.querySelector(".choiceO");
let playBoard = document.querySelector(".playBoard");
let allBox = document.querySelectorAll("section span");
let oturn = document.querySelector(".oturn");
let xturn = document.querySelector(".xturn");
let player = document.querySelector(".players");
let res = document.querySelector(".result");
let statement = document.querySelector(".won p");
let replay = document.querySelector(".replay");
let gameMusic = document.querySelector(".gameMusic");
let winMusic = document.querySelector(".winMusic");
let drawMusic = document.querySelector(".drawMusic");
let won = document.querySelector(".won");

// Onload of page
window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick","clickedBox(this)"); 
    }
    gameMusic.play();
    res.classList.add("hide");
    
    choiceX.onclick = () =>{
        selectChoice.classList.add("hide");
        playBoard.classList.add("show");
    }
    choiceO.onclick = () =>{
        selectChoice.classList.add("hide");
        playBoard.classList.add("show");
        oturn.classList.add("active");
        xturn.classList.remove("active");
    }
}

let playerXicon = "<b>X</b>";
let playerOicon = "<b>O</b>";

let arr=[10,11,12,13,14,15,16,17,18];
let winPositions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let isWin = false;
let count=0;
let winnerName;

// Onclick on boxes
function clickedBox(element){
    if(xturn.classList.contains("active")){
        element.innerHTML = playerXicon;
        oturn.classList.add("active");
        xturn.classList.remove("active");
        element.style.pointerEvents = "none";
        let eleId = element.id;
        let index = parseInt(eleId[3])-1;
        arr[index]=1;
        winnerName = 'X';
        cheakWinner();
        if(isWin==true && winnerName =='X'){
            setTimeout(() => {
                result(winnerName); 
            }, 500);
        } 
        count++;
        matchDraw();
        if(isWin != true){
            setTimeout(() => {
                bot();
            }, 500);
        }

    }else{
        element.innerHTML = playerOicon;
        xturn.classList.add("active");
        oturn.classList.remove("active");
        element.style.pointerEvents = "none";
        let eleId = element.id;
        let index = parseInt(eleId[3])-1;
        arr[index]=0;
        cheakWinner();
        winnerName = 'O';
        if(isWin==true && winnerName =='O'){
            setTimeout(() => {
                result(winnerName); 
            }, 500);
    
        }
        count++;
        matchDraw();
        if(isWin != true){
            setTimeout(() => {
                bot();
            }, 500);
        }
    }
}

// Bot player
function bot(){
    let tempArray = [];
    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0){
            tempArray.push(i);
        }
    }
    let randomBox = tempArray[Math.floor(Math.random() *tempArray.length)];
    if(xturn.classList.contains("active")){
        
        allBox[randomBox].innerHTML = playerXicon;
        oturn.classList.add("active");
        xturn.classList.remove("active");
        allBox[randomBox].style.pointerEvents = "none";
        arr[randomBox]=1;
        winnerName = 'X';
        cheakWinner();
        if(isWin==true && winnerName =='X'){
            setTimeout(() => {
                result(winnerName); 
            }, 500);
        }
        count++;
        matchDraw();

    }else{
        allBox[randomBox].innerHTML = playerOicon;
        xturn.classList.add("active");
        oturn.classList.remove("active");
        allBox[randomBox].style.pointerEvents = "none";
        arr[randomBox]=0;
        cheakWinner();
        winnerName = 'O';
        if(isWin==true && winnerName =='O'){
            setTimeout(() => {
                result(winnerName); 
            }, 500);
        }
        count++;
        matchDraw();
    }
}

// Cheak Winner
function cheakWinner(){
    winPositions.forEach(elements => {
        if((arr[elements[0]] == arr[elements[1]]) && (arr[elements[1]] == arr[elements[2]]) && (arr[elements[0]] == arr[elements[2]]))
        {
            isWin = true;
        }
    });
}

// Result
function result(winner){
    playBoard.classList.add("hide");
    playBoard.classList.remove("show");
    res.classList.add("show");
    res.classList.remove("hide");
    console.log(winner);
    if(winner == 'O'){
        statement.innerHTML='O';
    }
    winMusic.play();
    gameMusic.pause();
}

// Match Draw
function matchDraw(){
    if(count == 9 && isWin!=true){
        playBoard.classList.add("hide");
        playBoard.classList.remove("show");
        res.classList.add("show");
        res.classList.remove("hide");
        won.innerHTML = "Match has been Draw !"
        drawMusic.play();
        gameMusic.pause();
    }
}

// replay the game
replay.onclick = ()=>{
    location.reload();
}

