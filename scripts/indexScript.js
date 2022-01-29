

let takeToCategoryChoiseScreen = () => {



    console.log(event.target)

}


let changeIconColor = () => {

    puzzleIcon.classList.toggle("bg-yellow");
}


let puzzleIcon = document.getElementById('puzzleIcon');
console.log(puzzleIcon)

puzzleIcon.addEventListener('mouseover', changeIconColor)
puzzleIcon.addEventListener('mouseout', changeIconColor)
puzzleIcon.addEventListener('click', takeToCategoryChoiseScreen)


















