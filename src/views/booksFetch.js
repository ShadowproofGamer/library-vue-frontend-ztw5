//returns an array with books (just like GET http://localhost:8080/books)
export function getBooks(id) {
    return fetch("http://localhost:8080/books")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // This will log the JSON response to the console
            return data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}