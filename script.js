let qData;
let currentQuestion = 0;

fetch('question-data.json')
    .then(response => response.json())
    .then(data => {
        qData = data;
        nextQuestion();
    })
    .catch(error => console.error('Error fetching JSON:', error));

function nextQuestion() {
    if (currentQuestion < qData.length) {
        currentQuestion++;

        const progBar = document.getElementById("progressBar");
        progBar.style.width = currentQuestion * (100/qData.length) + "%";
        document.getElementById("progressText").innerHTML = currentQuestion+"/"+qData.length;

    }
    else {
        alert("FÄRDIG") //End page
    }
}

