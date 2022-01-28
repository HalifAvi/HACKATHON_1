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

    console.log("You droped!!!");
    // console.log(event.target) //  event.target is the div we want to drop into him
  
    // retrieve the data dragged  
    let draggedPieceCurrIdStrType = event.dataTransfer.getData("text");
    let draggedPieceCurrIdNumType = parseInt(draggedPieceCurrIdStrType);
    //data: The current position of piece we move
    // console.log("dragged pos: ", draggedPieceCurrId) 
  
    // retrieve the current position of undragged piece
    let undraggedPieceCurrIdStrType  = event.target.id;
    let undraggedPieceCurrIdNumType  = parseInt(undraggedPieceCurrIdStrType);


    // Replace the places of both pieces
    let undraggedPiece = Object.assign({}, puzzlePiecesArr[undraggedPieceCurrIdNumType]);
    puzzlePiecesArr[undraggedPieceCurrIdNumType] = Object.assign({}, puzzlePiecesArr[draggedPieceCurrIdNumType]); 
    puzzlePiecesArr[draggedPieceCurrIdNumType] = undraggedPiece;

    // Change the div attribute according to the new position after replacement
    // We can't give the same id name to two elements so we have to remove first
    puzzlePiecesArr[draggedPieceCurrIdNumType].div.setAttribute('id',"");
    puzzlePiecesArr[undraggedPieceCurrIdNumType].div.setAttribute('id',"");
    puzzlePiecesArr[draggedPieceCurrIdNumType].div.setAttribute('id',draggedPieceCurrIdStrType);
    puzzlePiecesArr[undraggedPieceCurrIdNumType].div.setAttribute('id',undraggedPieceCurrIdStrType);


    puzzlePiecesArr[draggedPieceCurrIdNumType].currPosition = draggedPieceCurrIdNumType;
    puzzlePiecesArr[undraggedPieceCurrIdNumType].currPosition = undraggedPieceCurrIdNumType;

    console.log(puzzlePiecesArr)


    //console.log(puzzlePiecesArr[draggedPieceCurrId])
    //console.log(puzzlePiecesArr[undraggedPieceCurrId])

    removePuzzlePiecesDivsFromMainDiv();
    appendPuzzlePiecesDivsToMainDiv();

    if(isUserFinishThePuzzle()){

        console.log("YEAHHHHHHHHHHHHHHHHHHHHHHH!!!")
    }

    event.preventDefault();
}

const isUserFinishThePuzzle = () => {

    let isFinish = true;

    for(let i=0; i<level*level; i++){

        if(puzzlePiecesArr[i].currPosition !== puzzlePiecesArr[i].puzzlePieceNum){

            isFinish = false;
            break;
        }
    }  

    return isFinish;
}

const removePuzzlePiecesDivsFromMainDiv = () =>{

    whereToAppendPuzzleBoard.innerHTML = '';
}



const displayPuzzleBoardGame = () => {

    let imageNoToDisplay = getRandomImageToDisplay();

    for(let i=0; i<level; i++) {

        for(j=0; j<level; j++){

            let puzzlePieceDiv = document.createElement('div');
            puzzlePieceDiv.style.width = "200px"; // 150 // 300 // 200 // 150
            puzzlePieceDiv.style.height = "120px"; // 100 // 200 // 120 //  100
            puzzlePieceDiv.style.border = "1px solid lightgray";
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
            puzzlePieceDiv.style.backgroundImage = `url(../images/medium/food/0/${puzzlePieceNum}.jpg)`;

            puzzlePiecesArr[randomPosition] = {'div': puzzlePieceDiv, 'puzzlePieceNum': puzzlePieceNum++,
                                               'currPosition': randomPosition}; 
        }
    } // 'currRowIdx': i, 'currColIdx': j,  'originRowIdx': i, 'originColIdx': j

    appendPuzzlePiecesDivsToMainDiv();

    console.log(puzzlePiecesArr)
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




