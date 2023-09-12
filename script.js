fetch('yourfile.json')
  .then(response => response.json())
  .then(data => {
    // Handle the JSON data here
  })
  .catch(error => console.error('Error fetching JSON:', error));
