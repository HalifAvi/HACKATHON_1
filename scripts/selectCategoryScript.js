
// Define an obj to keep the user choises
let userChoises = { level: "", category: ""};



// This function return the value of checked value in radio btt
const getValueOfCheckedRadio = radioOptions => {

    let checkedOptionNum;

    for(let i=0; i<radioOptions.length; i++){

        if(radioOptions[i].getElementsByTagName('input')[0].checked){
   
           checkedOptionNum = i;
           break;
        }
    }

    let checkedValue = radioOptions[checkedOptionNum].getElementsByTagName('label')[0].innerHTML;

    return checkedValue;
}



// Add event to slide btt
document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-gam-cat')
	}
);


// When the user press the start the game btt move to next page according to the input from user
const startTheGame = () => {

    // Get the radio btts level options node list
    let radioLevelOptions = document.getElementsByClassName('radioLevels')[0].querySelectorAll('.form-check-level');

    userChoises.level = getValueOfCheckedRadio(radioLevelOptions);


    // Get the radio btts category options node list
    let radioCategoryOptions = document.getElementsByClassName('radioCategories')[0].querySelectorAll('.form-check-category');

    userChoises.category = getValueOfCheckedRadio(radioCategoryOptions);

    localStorage.setItem("userLevel", userChoises.level); 
    localStorage.setItem("userCategory", userChoises.category); 
    location.href = "file:///C:/Users/avi/Desktop/HACKATHON_1/html/puzzleGameBoardMainPage.html";
}



let startTheGameBtt = document.querySelector('button#startGameBtt');
startTheGameBtt.addEventListener('click', startTheGame);

















