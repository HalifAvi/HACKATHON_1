const level = 5;
let puzzlePiecesArr = [];
let puzzlePieceNum = 0;
const easy = 3;
const medium = 5;
const hard =7;




const displayPuzzleBoardGame = () => {

    let imageNoToDisplay = getRandomImageToDisplay();

    for(let i=0; i<level; i++) {

        for(j=0; j<level; j++){

            let puzzlePieceDiv = document.createElement('div');
            puzzlePieceDiv.style.width = "200px";
            puzzlePieceDiv.style.height = "100px";
            puzzlePieceDiv.style.border = "2px solid lightgray";
            puzzlePieceDiv.style.backgroundRepeat = "no-repeat";
            puzzlePieceDiv.style.backgroundSize = "cover";
            puzzlePieceDiv.style.backgroundPosition = "center";

            puzzlePieceDiv.classList.add('puzzlePiece');

            let randomPosition = getRandomNumToPuzzlePieceLocation();
// ${imageNoToDisplay}
            puzzlePieceDiv.style.backgroundImage = `url(../images/medium/animals/0/${puzzlePieceNum}.jpg)`;

            puzzlePiecesArr[randomPosition] = {'div':puzzlePieceDiv, 'originRowIdx': i, 'originColIdx': j, 'currRowIdx': i, 'currColIdx': j, 'puzzlePieceNum': puzzlePieceNum++};
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

    // Returns a random integer from 0 to 2:
    randomImageNum = Math.floor(Math.random() * (3));
    
    return randomImageNum;
}


const appendPuzzlePiecesDivsToMainDiv = () => {

    let whereToAppendPuzzleBoard = document.querySelector("#col1");

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




