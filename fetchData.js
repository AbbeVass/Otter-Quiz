let fileNum = 0;
let qstData = [];

function fetchQuestionData(fileNum) {
    return fetch(`quizes/question-data${fileNum}.json`)
        .then(response => response.json())
        .then(data => {
            qstData.push(data);
        })
        .catch(error => {
            // Handle the error (e.g., log or alert)
            console.error('Error fetching JSON:', error);
        });
}

function fetchAllQuestionData() {
    function fetchNext() {
        return fetchQuestionData(fileNum).then(() => {
            fileNum++;
            return fetchNext();
        });
    }

    return fetchNext();
}

fetchAllQuestionData().then(() => {
    // Do something with qstDatas when all data is fetched
    console.log('All data fetched:', qstData);
});