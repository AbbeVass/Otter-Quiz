let qstData;
let currentQuestion = 3;
let btnWorks = false;
let choosenAnswer = -1;
let points = 0;

fetch('question-data.json')
    .then(response => response.json())
    .then(data => {
        qstData = data;
        nextQuestion();
    })
    .catch(error => console.error('Error fetching JSON:', error));

function nextQuestion() {
    btnWorks = false;
    document.getElementById("continueBtn").style.cursor = "default";

    if (currentQuestion < qstData.length) {
        currentQuestion++;
        choosenAnswer = -1;

        const prgBar = document.getElementById("progressBar");
        prgBar.style.width = (currentQuestion * 100) / qstData.length + "%";
        document.getElementById("progressText").innerHTML = currentQuestion + "/" + qstData.length;

        const qst = qstData[currentQuestion - 1];
        document.getElementById("question").innerHTML = qst.question;

        // Clear the answers container before adding new answers
        const answersContainer = document.getElementById("answers");
        answersContainer.innerHTML = "";

        for (let i = 0; i < qst.answers.length; i++) {
            answersContainer.innerHTML += `
                <div class="answer-container" id="answer${i}">
                    <div class="checkmark" id="checkmark${i}"></div>
                    <p class="answer-text">${qst.answers[i]}</p>
                </div>
            `;
        }
        for (let i = 0; i < qstData[currentQuestion - 1].answers.length; i++) {
            document.getElementById("answer" + i).addEventListener("click", createClickListener(i));
        }

    } else {
        document.getElementById("content").innerHTML = `
            <h1>Du är inte värd ${points} uttrar!<h1>
        `;
    }
}

function createClickListener(index) {
    return function () {
        for (checkmark of document.getElementsByClassName("checkmark")) {
            checkmark.style.backgroundColor = "#000000";
        }
        document.getElementById("checkmark" + index).style.backgroundColor = "#aa82ff";
        choosenAnswer = index;
        btnWorks = true;
        document.getElementById("continueBtn").style.cursor = "pointer";
    };
}
