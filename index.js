function createNewMovie(event) {
    event.preventDefault(); 

    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const country = document.getElementById("country").value;
    const year = document.getElementById("year").value;
    const description = document.getElementById("description").value;
    const imageUrl = document.getElementById("image-url").value; 
    const videoLink = document.getElementById("video-link").value; 


    if (!title || !genre || !country || !year || !description || !imageUrl) {
        alert("Please fill in all fields");
        return;
    }

    const movie = {
        title,
        genre,
        country,
        year,
        description,
        imageUrl,
        videoLink
    };


    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    movies.push(movie);

    localStorage.setItem("movies", JSON.stringify(movies));

    displayMovieCard(movie);

    document.getElementById("movie-form").reset();
}

function displayMovieCard(movie) {

    const movieCard = document.createElement("div");
    movieCard.classList.add("ui", "card");

    movieCard.innerHTML = `
        <div class="image">
            <img src="${movie.imageUrl}">
        </div>
        <div class="content">
            <h2 class="header">${movie.title}</h2>
            <div class="meta">
                <span class="date">Released: ${movie.year}</span>
            </div>
            <div class="description">
                <strong>Genre:</strong> ${movie.genre} <br>
                <strong>Country:</strong> ${movie.country} <br>
                <strong>Description:</strong> ${movie.description}
            </div>
        </div>
        <div class="extra content">
            <button class="ui red button delete-button">Delete</button>
            ${movie.videoLink ? `<a href="${movie.videoLink}" class="ui blue button" target="_blank">Watch Now</a>` : ""}
        </div>
    `;

    document.getElementById("movie-cards-container").appendChild(movieCard);

    const deleteButton = movieCard.querySelector(".delete-button");
    deleteButton.addEventListener("click", function() {
        movieCard.remove();
        removeMovieFromLocalStorage(movie);
    });
}

function removeMovieFromLocalStorage(movieToRemove) {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    movies = movies.filter(movie => movie.title !== movieToRemove.title);

    localStorage.setItem("movies", JSON.stringify(movies));
}

function loadMoviesFromLocalStorage() {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    movies.forEach(movie => {
        displayMovieCard(movie);
    });
}

document.getElementById("submit-button").addEventListener("click", createNewMovie);

window.onload = loadMoviesFromLocalStorage;
