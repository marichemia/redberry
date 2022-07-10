const backBtns = document.querySelectorAll(".back-button");
const nextBtns = document.querySelectorAll(".next-button");
const pages = document.querySelectorAll(".page");
const done = document.getElementById("done");

let pageNum = 0;

nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pageNum++;
        updatePages();
    })
})

function updatePages() {
    pages[pageNum].classList.add("active");
    pages[pageNum - 1].classList.remove("active");
}

backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pageNum--;
        backPage();
    })
})

function backPage() {
    pages[pageNum].classList.add("active");
    pages[pageNum + 1].classList.remove("active");
}

const request = fetch('https://chess-tournament-api.devtest.ge/api/grandmasters')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })

// drop-down input fields
const button = document.querySelector("#select-button");
const options = document.querySelector("#options");
const allOptions = document.querySelectorAll(".option");
const selectLabel = document.querySelector("#select-button-text");
const asterisk = document.querySelector(".asterisk");
button.addEventListener('click', function (e) {
    e.preventDefault();
    toggleHidden();
})

function toggleHidden() {
    options.classList.toggle('none');
}

allOptions.forEach(function (option) {
    option.addEventListener('click', function (e) {
        setSelectTitle(e);
    })
})

function setSelectTitle(e) {
    const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
    if (labelElement == "Beginner" || labelElement == "Intermediate" || labelElement == "Professional") {
        selectLabel.innerText = labelElement;
        asterisk.remove();
        toggleHidden();
    }


}


const playerButton = document.querySelector("#player-button");
const playerOptions = document.querySelector("#player-options");
const allPlayerOptions = document.querySelectorAll(".player-list");
const selectPlayerLabel = document.querySelector("#player-button-text");
const playerAsterisk = document.querySelector(".player-asterisk");

playerButton.addEventListener('click', function (e) {
    e.preventDefault();
    hidden();
})

function hidden() {
    playerOptions.classList.toggle('none');
}

allPlayerOptions.forEach(function (option) {
    option.addEventListener('click', function (e) {
        setTitle(e);
    })
})

function setTitle(e) {
    const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
    console.log(labelElement);
    if (labelElement == "Nona Gaprindashvili" || labelElement == "Mikhail Tal" || labelElement == "Bobby Fisher" || labelElement == "Magnus Carlsen") {
        selectPlayerLabel.innerText = labelElement;
        playerAsterisk.remove();
        hidden();
    }


}

//form validation
const name = document.getElementById("name");
const mail = document.getElementById("mail");
const number = document.getElementById("number");
const date = document.getElementById("date");
const nextButton = document.getElementById("1page-next-button");


if (name.value.length < 2 || mail.value == "" || mail.value.endsWith('@redberry.ge') == false || number.value.length != 9 || isNaN(number.value) == true || date.value == "") {
    nextButton.disabled = true;
} else if (name.value.length >= 2 && mail.value != '' && mail.value.endsWith('@redberry.ge') == true && number.value.length == 9 && isNaN(number.value) == false && date.value != "") {
    nextButton.disabled = false;
}


//submit
const participationButtons = document.querySelectorAll(".participation");

const userInput = () => {


    let participation;
    for (const radioButton of participationButtons) {
        if (radioButton.checked) {
            participation = radioButton.value;
            break;
        }
    }

    let participated = false;
    if (participation == 'yes') {
        participated = true;
    }

    let player;
    if (document.getElementById("player-button-text").innerText == "Magnus Carlsen") {
        player = 3;
    } else if (document.getElementById("player-button-text").innerText == "Bobby Fisher") {
        player = 2;
    } else if (document.getElementById("player-button-text").innerText == "Mikhail Tal") {
        player = 1;
    } else if (document.getElementById("player-button-text").innerText == "Nona Gaprindashvili") {
        player = 0;
    }

    let input = {
        "name": name.value,
        "email": mail.value,
        "number": number.value,
        "dob": date.value,
        "participation": participated,
        "character": player,

    }

    fetch("https://chess-tournament-api.devtest.ge/api/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
    }).then(response => response.json())
        .then(json => console.log(json))

}

document.addEventListener('DOMContentLoaded', function () {
    done.addEventListener('click', userInput);
})








