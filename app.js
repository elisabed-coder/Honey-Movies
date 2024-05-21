async function fetchData(movieTitle) {
  const apiKey = "e6d88b55";
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
      movieTitle
    )}`
  );
  const movieData = await response.json();
  return movieData;
}

async function addMoviesToTopRatedList() {
  const movieList = document.getElementsByClassName("top-rated-movies-list")[0];

  const movieTitles = ["Avatar", "Venom", "Bloodshot"];
  const movieDataArray = await Promise.all(movieTitles.map(fetchData));

  movieDataArray.forEach((movieData) => {
    const movie = document.createElement("div");
    movie.classList.add("top-movie-card");
    const rating = Math.round(parseFloat(movieData.imdbRating)) / 2;
    console.log(rating);

    // Create star rating HTML

    // Create star rating HTML
    let starsHTML = "";
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        starsHTML += '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>'; // Filled star
      } else if (rating >= i + 0.5) {
        starsHTML +=
          '<i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>';
      }
      // else {
      //   starsHTML += '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>'; // Empty star
      // }
    }

    movie.addEventListener("click", function () {
      const movieId = movieData.imdbID;
      const movieDetailsUrl = `movieDetails.html?id=${movieId}`; // Construct the URL for the movie details page
      window.location.href = movieDetailsUrl; // Redirect the user to the movie details page
    });

    movie.innerHTML = `
          <img src="${movieData.Poster}" alt="Poster for ${movieData.Title}"/>
          <div class="imdb_rating">
           <p>${movieData.imdbRating}</p>
          </div>
          <div class="movie-details">
            <h3>${movieData.Title}</h3>
            <div class="star-rating" data-rating="${rating}">
              ${starsHTML}
            </div>
            <p>${movieData.Released}</p>
            <p>${movieData.Plot}</p>
          </div>`;

    movieList.appendChild(movie);
  });
}

// Example usage:
addMoviesToTopRatedList();

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");

async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=e6d88b55`;
  const res = await fetch(URL);
  const data = await res.json();
  if (data.Response === "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
  console.log(searchTerm);
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in data-id
    movieListItem.classList.add("search-list-item");

    movieListItem.innerHTML = `
    <div class="search-item-thumbnail">
        <img src="${movies[idx].Poster}" alt="Poster for ${movies[idx].Title}"/>
    </div>
    <div class="search-item-info">
        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>
    </div>
    `;

    movieListItem.addEventListener("click", async () => {
      const movieId = movieListItem.dataset.id;
      const movieDetailsUrl = `movieDetails.html?id=${movieId}`; // Construct the URL for the movie details page
      window.location.href = movieDetailsUrl; // Redirect the user to the movie details page
    });

    searchList.appendChild(movieListItem);
  }
}

// Add event listener for search box input
movieSearchBox.addEventListener("input", findMovies);
