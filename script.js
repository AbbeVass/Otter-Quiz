let qstData;
let currentQuestion = 0;
let btnWorks = false;

fetch('question-data.json')
    .then(response => response.json())
    .then(data => {
        qstData = data;
        nextQuestion();
    })
    .catch(error => console.error('Error fetching JSON:', error));

function nextQuestion() {
    if (currentQuestion < qstData.length) {
        currentQuestion++;

        const prgBar = document.getElementById("progressBar");
        prgBar.style.width = currentQuestion * (100/qstData.length) + "%";
        document.getElementById("progressText").innerHTML = currentQuestion+"/"+qstData.length;

        const qst = qstData[currentQuestion-1];
        document.getElementById("question").innerHTML = qst.question;

        for (let i = 0; i < qst.answers.length; i++) {
            document.getElementById("answers").innerHTML += `
                <div class="answer-container">
                    <div class="checkmark"></div>
                    <p class="answer-text">${qst.answers[i]}</p>
                </div>
            `;
        }
    }
    else {
        alert("Färdig") //End page
    }
}

