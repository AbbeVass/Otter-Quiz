let qData = [];
let questionNum = 0;
let answersArray = [];
let pointsArray = [];
let answerNum = 0;

function saveAnswers() {
    answersArray = [];
    pointsArray = [];

    const answersAndPoints = document.getElementById("answersContainer").querySelectorAll("input");
    for (let i = 0; i < answersAndPoints.length; i += 2) {
        answersArray.push(answersAndPoints[i].value);
        pointsArray.push(answersAndPoints[i+1].value);
    }
}

function addAnswer() {
    saveAnswers();
    answerNum++;
    document.getElementById("answersContainer").innerHTML += `
    <br>
    <label>${answerNum+1}</label>
    <input type="text" id="answer${answerNum}" class="answer">
    <label>Poäng:</label>
    <input type="number" id="answer${answerNum}Points" class="answer-points">`;

    //Add back answer options and points
    for (let i = 0; i < answersArray.length; i++) {
        document.getElementById("answer"+i).value = answersArray[i];
        document.getElementById("answer"+i+"Points").value = pointsArray[i];
    }
}

function saveQuestion() {
    saveAnswers();
    let questionValue = document.getElementById("question").value;

    for (let i = 0, iOff = 0; i < answersArray.length; i++) {
        if (!answersArray[i] && !pointsArray[i]) {
            answersArray.splice(i, 1);
            pointsArray.splice(i, 1);
            i--;
            iOff++;
        } else if (!answersArray[i] || !pointsArray[i]) {
            alert("Du måste fylla i fråga och poäng för fråga "+(i+iOff+1));
            return
        }
    }

    if (questionValue && answersArray[0] && pointsArray[0]) {
        qData.push(
        {
            question: questionValue,
            answers: answersArray,
            points: pointsArray
        }
        );
        
        let previewSection = `
            <div class="question-container">
                <h4 class="question">${questionValue}</h4>
                <ol>
        `;
        for (let i = 0; i <answersArray.length; i++) {
            previewSection += `
                <li>(${pointsArray[i]}p) ${answersArray[i]}</li>
            `;
        }
        previewSection += `
                </ol>
            </div>
        `;

        console.log(previewSection);
        document.getElementById("questionsPreview").innerHTML += previewSection;

        document.querySelector("h2").innerHTML = `Frågor: (${qData.length})`
        clearForm();
    }
    else { alert("Information saknas"); }
}

function clearForm() {
    answerNum = 0;
    answersArray = [];
    pointsArray = [];

    document.getElementById("rightSection").innerHTML = `
        <h4 style="margin-bottom: 10px;">Fråga:</h4>
        <textarea id="question" cols="30" rows="3"></textarea>
        <h4 style="margin-bottom: 10px;">Svarsalternativ:</h4>
        <div id="answersContainer">
            <label>1</label>
            <input type="text" id="answer0" class="answer">
            <label>Poäng:</label>
            <input type="number" id="answer0Points" class="answer-points">
        </div>
        <button onclick="addAnswer()" style="margin-top: 5px;">Lägg till svarsalternativ</button>
        <br>
        <button onclick="saveQuestion()" style="margin-top: 20px;">Spara fråga</button>
        <br>
    `;
}

function download() {
    const jsonData = JSON.stringify(qData);
    const a = document.getElementById("download");
    a.href = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;
    a.download = 'questions-data.json';
    alert("Skicka filen till Abbe");
}