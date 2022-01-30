

let takeToCategoryChoiseScreen = () => {

    location.href = "file:///C:/Users/avi/Desktop/HACKATHON_1/html/selectCategory.html";
}


let changeIconColor = () => {

    puzzleIcon.classList.toggle("bg-yellow");
}


let puzzleIcon = document.getElementById('puzzleIcon');

if(puzzleIcon !== null){

puzzleIcon.addEventListener('mouseover', changeIconColor);
puzzleIcon.addEventListener('mouseout', changeIconColor);
puzzleIcon.addEventListener('click', takeToCategoryChoiseScreen);
}





















