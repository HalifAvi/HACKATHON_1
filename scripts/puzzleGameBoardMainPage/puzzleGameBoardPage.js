/**************************GLOBAL VARIABELS******************************/

let sec = 20;
let howManyTimePressed = 3;
let intervalBanner;
let puzzlePiecesArr = [];
let puzzlePieceNum = 0;
let imageNumToDisplay;
let whereToAppendTimer;
let whereToAppendPuzzleBoard = document.querySelector("#col1");


/**************************GLOBAL CONST VARIABELS******************************/

const numOfImgsInEachCategory = 2;
const levels = [{level: "easy", rank: 3, numOfPieces: 9},
                {level: "medium", rank: 5, numOfPieces: 25},
                {level: "hard", rank: 7, numOfPieces: 49}];


// Update the user inputs 
const userLevel = localStorage.getItem("userLevel").trim();
const category = localStorage.getItem("userCategory").trim();
let announcement = '';

if(localStorage.getItem("userName") !== null){

    const userName = (localStorage.getItem("userName").trim()).toUpperCase();
    announcement = `${userName}`
}



/**************************EVENTS FUNCTIONS******************************/


// Doing this function when start drag a puzzle piece
const dragStart = () => {

    event.dataTransfer.setData("text", event.target.id); // The current position of dragged piece
}


// Doing this function when dragging a puzzle piece hover other piece (called also 'when over')
const allowDrop = () => {

    event.preventDefault(); // Necessary. Allows us to drop.
}


// Doing this function when droping one puzzle piece on other
const dragDrop = event => {

    changeBetweenTwoPuzzlePieces(event);

    redrawPuzzleBoard();

    announceWhenUserCompleteThePuzzle();

    event.preventDefault();
}


/*************************FUNCTIONS************************************/


// This function tell the user if he won the game
const announceWhenUserCompleteThePuzzle = () => {

    if(isUserFinishThePuzzle()){

        makePicecsDisableToMove();
        startConfetti();       
        // turnOnWinnerAudio();    
        displayAnnouncementIfWinnerOrNot(announcement+'YOUWIN!');
    }
}


// This function starts the cound down and display to the user
const startTimer = () => {

    whereToAppendTimer = document.querySelector('#col2');

    intervalBanner = setInterval(function(){

        if(sec >= 10){

            whereToAppendTimer.innerHTML = '00 : ' + sec;
        }
        else{

            whereToAppendTimer.innerHTML = '00 : 0' + sec;
        }

        sec--;

        if(sec<0){

            clearInterval(intervalBanner);
            whereToAppendTimer.innerHTML = '00 : 00'
            makePicecsDisableToMove();
            whereToAppendTimer.innerHTML= ""; // remove timer

            if(!isUserFinishThePuzzle()){ // In case the time over and the user didn't complete the puzzle

                displayAnnouncementIfWinnerOrNot(announcement+'YOULOSE:(');
            }
        }
    }, 1000);
}

// This function handle the all set for nav bar
const setNavBar = () => {

    setNavBarMarkedCategories();
    setInteractionBetweenXandNavBar();

}


const setInteractionBetweenXandNavBar = () => {

    let menuToggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation')

    menuToggle.onclick = function() {

        menuToggle.classList.toggle('active');
        navigation.classList.toggle('active');
    }
}


// This function set white mark when mouse hover the nav bar categories
const setNavBarMarkedCategories = () => {

    let list = document.querySelectorAll('.list');
    
    for(let i=0; i< list.length; i++){

        list[i].onmouseover = function() {

            let j = 0;
            
            while(j < list.length){

                list[j++].className = 'list';
            }
        
            list[i].className = 'list active';
        }
    }
}


// This function display message if user is a winner or not
const displayAnnouncementIfWinnerOrNot = strToDisplay => {

    let h1 = document.createElement('h1');

    setAnimationToEachLetter(h1, strToDisplay);

    whereToAppendTimer.innerHTML = " "; // Remove timer cause the user won
    clearInterval(intervalBanner);

    whereToAppendPuzzleBoard.appendChild(h1);
}


// This function set bounce animation for each letter in sentence
const setAnimationToEachLetter = (whereToAppend, strToDisplay) => {

    for(let i=0; i<strToDisplay.length; i++){

        let span = document.createElement('span');
        let txtNode = document.createTextNode(strToDisplay[i]);
        span.appendChild(txtNode);
        whereToAppend.appendChild(span);

        if(i !== strToDisplay.length-1){

            let span2 = document.createElement('span');
            let txtNode2 = document.createTextNode("-");
            span2.appendChild(txtNode2);
            whereToAppend.appendChild(span2);
        }
    }
}


// This function stop confetti on screen
const stopConfetti = () => {

    setTimeout(function(){
        confetti.stop();
    },5000)
}


// This function start confetti on screen
const startConfetti = () => {
    setTimeout(function(){
        confetti.start();
    }, 1000);
}


// Make puzzle pieces undraggable
const makePicecsDisableToMove = () => {

    let numOfPieces = (levels.find(obj => obj.level === userLevel)).numOfPieces;

    for(let i=0; i<numOfPieces; i++){

        puzzlePiecesArr[i].div.classList.add('puzzlePieceAfterWin');
        puzzlePiecesArr[i].div.setAttribute('draggable','false');
        puzzlePiecesArr[i].div.removeEventListener('dragstart', dragStart);
        puzzlePiecesArr[i].div.removeEventListener('dragover', allowDrop);
        puzzlePiecesArr[i].div.removeEventListener('drop', dragDrop);
    }

    makePuzzlePiecesBlur(numOfPieces);
}


// make puzzle pieces blur
const makePuzzlePiecesBlur = numOfPieces => {

    setTimeout(function(){
         
        for(let i=0; i<numOfPieces; i++){
    
            puzzlePiecesArr[i].div.classList.add('blur');
        }},1000)
}


// This function display the puzzle board again
const redrawPuzzleBoard = () => {

    removePuzzlePiecesDivsFromMainDiv();
    appendPuzzlePiecesDivsToMainDiv();
}


// This function change positions between 2 puzzle pieces
const changeBetweenTwoPuzzlePieces = event => {

    /////retriveTheIdsOfDraggedAndUndraggedPuzzlePieces

    // retrieve the data dragged  
    let draggedPieceCurrIdStrType = event.dataTransfer.getData("text");
    let draggedPieceCurrIdNumType = parseInt(draggedPieceCurrIdStrType);

    // retrieve the current position of undragged piece
    let undraggedPieceCurrIdStrType  = event.target.id;
    let undraggedPieceCurrIdNumType  = parseInt(undraggedPieceCurrIdStrType);

    // The user want to change pieces positions so replace the places of both pieces in the array  
    let undraggedPiece = Object.assign({}, puzzlePiecesArr[undraggedPieceCurrIdNumType]);
    puzzlePiecesArr[undraggedPieceCurrIdNumType] = Object.assign({}, puzzlePiecesArr[draggedPieceCurrIdNumType]); 
    puzzlePiecesArr[draggedPieceCurrIdNumType] = undraggedPiece;

    changeThePosIdOfTwoDivs(draggedPieceCurrIdNumType, undraggedPieceCurrIdNumType, draggedPieceCurrIdStrType, undraggedPieceCurrIdStrType);
}


// This function change the position ID of two puzzle pieces
const changeThePosIdOfTwoDivs = (draggedPieceCurrIdNumType, undraggedPieceCurrIdNumType,
                                 draggedPieceCurrIdStrType, undraggedPieceCurrIdStrType) => {

// Change the div attribute according to the new position after replacement
// We can't give the same id name to two elements so we have to remove first
puzzlePiecesArr[draggedPieceCurrIdNumType].div.setAttribute('id',"");
puzzlePiecesArr[undraggedPieceCurrIdNumType].div.setAttribute('id',"");
puzzlePiecesArr[draggedPieceCurrIdNumType].div.setAttribute('id',draggedPieceCurrIdStrType);
puzzlePiecesArr[undraggedPieceCurrIdNumType].div.setAttribute('id',undraggedPieceCurrIdStrType);

puzzlePiecesArr[draggedPieceCurrIdNumType].currPosition = draggedPieceCurrIdNumType;
puzzlePiecesArr[undraggedPieceCurrIdNumType].currPosition = undraggedPieceCurrIdNumType;
}


// This function return true if the user completed the game, opposite if not
const isUserFinishThePuzzle = () => {

    let isFinish = true;  
    let numOfPieces = (levels.find(obj => obj.level === userLevel)).numOfPieces;

    for(let i=0; i<numOfPieces; i++){

        if(puzzlePiecesArr[i].currPosition !== puzzlePiecesArr[i].puzzlePieceNum){

            isFinish = false;
            break;
        }
    }  

    return isFinish;
}


// This function remove all puzzle pieces from board
const removePuzzlePiecesDivsFromMainDiv = () =>{

    whereToAppendPuzzleBoard.innerHTML = '';
}


const addToTimer10Sec = () => {

    if(sec !==0 && howManyTimePressed > 0){

        sec += 10;
        howManyTimePressed--;
    }
}


// This function display the puzzle board according to the user parameters
const displayPuzzleBoardGame = () => {

    imageNumToDisplay = getRandomImageToDisplay();
 
    let numOfRowsAndCols = (levels.find(obj => obj.level === userLevel)).rank

    for(let i=0; i<numOfRowsAndCols; i++) {

        for(j=0; j<numOfRowsAndCols; j++){

            let puzzlePieceDiv = document.createElement('div');

            setVisualtyToPuzzlePieceDiv(puzzlePieceDiv);

            addEventListenersToPuzzlePieceDiv(puzzlePieceDiv);

            pushPuzzlePieceToObjArr(puzzlePieceDiv, imageNumToDisplay);
        }
    } 

    appendPuzzlePiecesDivsToMainDiv();
}


// This function insert single element to obj array (all the puzzle pieces)
const pushPuzzlePieceToObjArr = (puzzlePieceDiv, imageNumToDisplay) => {

let randomPosition = getRandomNumToPuzzlePieceLocation();
puzzlePieceDiv.setAttribute('id',randomPosition);
    
puzzlePieceDiv.style.backgroundImage = `url(../images/${userLevel}/${category}/${imageNumToDisplay}/${puzzlePieceNum}.jpg)`;
    
puzzlePiecesArr[randomPosition] = {'div': puzzlePieceDiv, 'puzzlePieceNum': puzzlePieceNum++,
                                   'currPosition': randomPosition}; 
}


// This function handle all drag and drop events
const addEventListenersToPuzzlePieceDiv = puzzlePieceDiv => {

    puzzlePieceDiv.setAttribute('draggable','true');
    puzzlePieceDiv.addEventListener('dragstart', dragStart);
    puzzlePieceDiv.addEventListener('dragover', allowDrop);
    puzzlePieceDiv.addEventListener('drop', dragDrop); // When we drop on him other rectangle
}


// This function set the visual aspect for the pieces according to the user choise
const setVisualtyToPuzzlePieceDiv = puzzlePieceDiv => {

    let idName;
    puzzlePieceDiv.classList.add("puzzlePieceBeforeWin"); 

    switch(userLevel){

        case 'easy' : idName = 'easyLevelSizePuzzlePiece';
            break;

        case 'medium' : idName = 'mediumLevelSizePuzzlePiece';
            break;

        case 'hard' : idName = 'hardLevelSizePuzzlePiece'; 
            break;
    }

    puzzlePieceDiv.classList.add('id',idName);
}


// This function return a random number consider as a rando, location for puzzle piece on board
const getRandomNumToPuzzlePieceLocation = () => {

    let randomPosition;
    let numOfPieces = (levels.find(obj => obj.level === userLevel)).numOfPieces;

    do{
        // Returns a random integer from 0 to level-1:
        randomPosition = Math.floor(Math.random() * numOfPieces);
    
    }while(puzzlePiecesArr[randomPosition] !== undefined);

    return randomPosition;
}


// This function return a random number consider as the image to display
const getRandomImageToDisplay = () => {

    let randomImageNum;

    // Returns a random integer from 0 to numOfImgsInEachCategory-1
    randomImageNum = Math.floor(Math.random() * (numOfImgsInEachCategory));
    
    return randomImageNum;
}


// This function appending the puzzle pieces div's to the main div
const appendPuzzlePiecesDivsToMainDiv = () => {

    setGridAccordingToLevel(whereToAppendPuzzleBoard);

    let numOfPieces = (levels.find(obj => obj.level === userLevel)).numOfPieces;
   
    for(let i=0; i<numOfPieces; i++){

        whereToAppendPuzzleBoard.appendChild(puzzlePiecesArr[i].div);
    }
}


// This function set the correct grid board according to user choise
const setGridAccordingToLevel = whereToAppendPuzzleBoard => {

    let idName;

    switch(userLevel){

        case 'easy' : idName = 'easyPuzzleGridBoard';
            break;

        case 'medium' : idName = 'mediumPuzzleGridBoard';
            break;

        case 'hard' : idName = 'hardPuzzleGridBoard'; 
            break;
    }

    whereToAppendPuzzleBoard.setAttribute('id',idName);
}


/**************************START OF PROGRAM**************************************/

displayPuzzleBoardGame();
setNavBar();
startTimer();
announceWhenUserCompleteThePuzzle();


// turnOnWinnerAudio();


