async function fetchMovieDetails(movieId) {
  const apiKey = "e6d88b55";
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
  );
  const movieData = await response.json();
  return movieData;
}

function getMovieIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function displayMovieDetails() {
  const movieId = getMovieIdFromUrl();
  if (!movieId) {
    document.getElementById("movie-details-container").innerText =
      "Movie ID not found in URL";
    return;
  }

  const movieData = await fetchMovieDetails(movieId);

  const rating = Math.round(parseFloat(movieData.imdbRating)) / 2;
  let starsHTML = "";
  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      starsHTML += '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>'; // Filled star
    } else if (rating >= i + 0.5) {
      starsHTML +=
        '<i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>'; // Half star
    }
  }
  const container = document.getElementById("movie-details-container");
  container.innerHTML = `
      <div>
      <button class="back-home-btn" href="index.html">
      <i class="fa-solid fa-chevron-left"></i>Back home</button>
      <div class="headers">
      <h1>${movieData.Title}</h1>
      <div class="star-rating" id="star-rating" data-rating="${rating}">
      ${starsHTML}
    </div>
    <p> ${movieData.imdbVotes}+ views</p>
      <img src="images/imdb.svg" alt="imdb" />
      <p class="movie-plot"> ${movieData.Plot}</p>
      <div>
      <button class="watch-list-btn">
         <i class="fa-solid fa-plus plus-icon"></i>Watchlist</button>
      <button class="watch-now-btn">Watch Now</button>
      </div>
      </div>  
      </div>
      <div>
      <img src="${movieData.Poster}" alt="Poster for ${movieData.Title}" class="movie_poster">
      </div>
    `;
  container.style.backgroundImage = `url('${movieData.Poster}')`;

  document.querySelector(".back-home-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// Display movie details when the page loads
displayMovieDetails();
