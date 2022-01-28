const level = 5;
let puzzlePiecesArr = [];
let puzzlePieceNum = 0;
const easy = 3;
const medium = 5;
const hard =7;
let whereToAppendPuzzleBoard = document.querySelector("#col1");


const dragStart = () => {

    //set the data to be dragged
    // console.log("target:",  event.target)
    // console.log("id: ",  event.target.id ) // id: number of image (origin place)

    event.dataTransfer.setData("text", event.target.id); // The current position of piece
}

// called also 'when over'
const allowDrop = () => {

    console.log("you now hover me!!!"); // Just for TEST
    event.preventDefault(); // Necessary. Allows us to drop.
}


const dragDrop = () => {

    event.preventDefault();
    
    console.log("You droped!!!");
    // console.log(event.target) //  event.target is the div we want to drop into him
  
    // retrieve the data dragged  
    let draggedPieceCurrId = event.dataTransfer.getData("text");
    //data: The current position of piece we move
    // console.log("dragged pos: ", draggedPieceCurrId) 
  
    // retrieve the current position of undragged piece
    let undraggedPieceCurrId = event.target.id;
    // console.log("undragged pos: ", undraggedPieceCurrId) 

    let undraggedPiece = puzzlePiecesArr[undraggedPieceCurrId];
    puzzlePiecesArr[undraggedPieceCurrId] = puzzlePiecesArr[draggedPieceCurrId];
    puzzlePiecesArr[draggedPieceCurrId] = undraggedPiece;

    puzzlePiecesArr[draggedPieceCurrId].div.setAttribute('id',undraggedPieceCurrId);
    puzzlePiecesArr[undraggedPieceCurrId].div.setAttribute('id',draggedPieceCurrId);

    puzzlePiecesArr[draggedPieceCurrId].div.currPosition = undraggedPieceCurrId;
    puzzlePiecesArr[undraggedPieceCurrId].div.currPosition = draggedPieceCurrId;

    //console.log(puzzlePiecesArr[draggedPieceCurrId])
    //console.log(puzzlePiecesArr[undraggedPieceCurrId])

    console.log(puzzlePiecesArr)

    removePuzzlePiecesDivsFromMainDiv();
    appendPuzzlePiecesDivsToMainDiv();
}

const removePuzzlePiecesDivsFromMainDiv = () =>{

    whereToAppendPuzzleBoard.innerHTML = '';
}



const displayPuzzleBoardGame = () => {

    let imageNoToDisplay = getRandomImageToDisplay();

    for(let i=0; i<level; i++) {

        for(j=0; j<level; j++){

            let puzzlePieceDiv = document.createElement('div');
            puzzlePieceDiv.style.width = "150px";
            puzzlePieceDiv.style.height = "100px";
            puzzlePieceDiv.style.border = "2px solid lightgray";
            puzzlePieceDiv.style.backgroundRepeat = "no-repeat";
            puzzlePieceDiv.style.backgroundSize = "cover";
            puzzlePieceDiv.style.backgroundPosition = "center";

            puzzlePieceDiv.setAttribute('draggable','true');
            puzzlePieceDiv.classList.add('puzzlePiece'); 
            puzzlePieceDiv.addEventListener('dragstart', dragStart);
            puzzlePieceDiv.addEventListener('dragover', allowDrop);
            puzzlePieceDiv.addEventListener('drop', dragDrop); // When we drop on him other rectangle

            let randomPosition = getRandomNumToPuzzlePieceLocation();
            puzzlePieceDiv.setAttribute('id',randomPosition);
// ${imageNoToDisplay}
            puzzlePieceDiv.style.backgroundImage = `url(../images/medium/animals/0/${puzzlePieceNum}.jpg)`;

            puzzlePiecesArr[randomPosition] = {'div': puzzlePieceDiv, 'originRowIdx': i, 'originColIdx': j,
            'currRowIdx': i, 'currColIdx': j, 'puzzlePieceNum': puzzlePieceNum++, 'currPosition': randomPosition};
        }
    }

    appendPuzzlePiecesDivsToMainDiv();
}

const getRandomNumToPuzzlePieceLocation = () => {

    let randomPosition;

    do{
        // Returns a random integer from 0 to level-1:
        randomPosition = Math.floor(Math.random() * (level*level));
    
    }while(puzzlePiecesArr[randomPosition] !== undefined);

    return randomPosition;
}

const getRandomImageToDisplay = () => {

    let randomImageNum;

    // Returns a random integer from 0 to 1:
    randomImageNum = Math.floor(Math.random() * (2));
    
    return randomImageNum;
}


const appendPuzzlePiecesDivsToMainDiv = () => {

    setGridAccordingToLevel(whereToAppendPuzzleBoard);
   
    for(let i=0; i<level*level; i++){

        whereToAppendPuzzleBoard.appendChild(puzzlePiecesArr[i].div);
    }
}

const setGridAccordingToLevel = (whereToAppendPuzzleBoard) => {

    let idName;

    switch(level){

        case easy : idName = 'easyPuzzleGridBoard';
            break;

        case medium : idName = 'mediumPuzzleGridBoard';
            break;

        case hard : idName = 'hardPuzzleGridBoard'; 
            break;
    }

    whereToAppendPuzzleBoard.setAttribute('id',idName);
}



displayPuzzleBoardGame();




