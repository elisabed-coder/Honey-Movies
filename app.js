// async function fetchData(movieTitle) {
//   const apiKey = "e6d88b55";
//   const response = await fetch(
//     `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
//       movieTitle
//     )}`
//   );
//   const movieData = await response.json();
//   console.log(movieData);
//   return movieData;
// }

// async function addMoviesToTopRatedList() {
//   const movieList = document.getElementsByClassName("top-rated-movies-list")[0];

//   const movieTitles = ["Avatar", "Venom", "Bloodshot"];
//   const movieDataArray = await Promise.all(movieTitles.map(fetchData));

//   movieDataArray.forEach((movieData) => {
//     const movie = document.createElement("div");
//     movie.classList.add("top-movie-card");
//     const rating = Math.round(parseFloat(movieData.imdbRating) / 2); // Convert 10-point scale to 5 stars
//     console.log(rating);

//     // Create star rating HTML
//     let starsHTML = "";
//     for (let i = 0; i < 5; i++) {
//       if (i < rating) {
//         starsHTML += '<span class="star filled">&#9733;</span>'; // Filled star
//       } else {
//         starsHTML += '<span class="star">&#9733;</span>'; // Empty star
//       }
//     }
//     movie.addEventListener("click", function () {
//       const movieId = movieData.imdbID;

//       const movieDetailsUrl = `movieDetails.html?id=${movieId}`; // Construct the URL for the movie details page
//       window.location.href = movieDetailsUrl; // Redirect the user to the movie details page
//     });

//     movie.innerHTML = `
//           <img src="${movieData.Poster}" alt="Poster for ${movieData.Title}"/>
//           <div class="imdb_rating">
//            <p>${movieData.imdbRating}</p>
//           </div>
//           <div class="movie-details">
//             <h3>${movieData.Title}</h3>
//             <div class="star-rating" data-rating="${rating}">
//               ${starsHTML}
//             </div>
//             <p>${movieData.Released}</p>
//             <p>${movieData.Plot}</p>
//           </div>`;

//     movieList.appendChild(movie);
//   });
// }

// // Example usage:
// addMoviesToTopRatedList();
async function fetchTMDbTopRatedMovies(apiKey, count = 3) {
  // const apiKey = "e6d88b55";
  const tmdbApiKey = "e6d88b55";

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
  );
  const data = await response.json();
  return data.results.slice(0, count);
}

async function fetchOMDbMovieDetails(movieTitle, omdbApiKey) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(
      movieTitle
    )}`
  );
  const movieData = await response.json();
  return movieData;
}

async function addMoviesToTopRatedList() {
  const tmdbApiKey = "YOUR_TMDB_API_KEY";
  const omdbApiKey = "e6d88b55";
  const movieList = document.getElementsByClassName("top-rated-movies-list")[0];

  const topRatedTMDbMovies = await fetchTMDbTopRatedMovies(tmdbApiKey);
  const movieDataArray = await Promise.all(
    topRatedTMDbMovies.map((movie) =>
      fetchOMDbMovieDetails(movie.title, omdbApiKey)
    )
  );

  movieDataArray.forEach((movieData) => {
    const movie = document.createElement("div");
    movie.classList.add("top-movie-card");
    const rating = Math.round(parseFloat(movieData.imdbRating) / 2); // Convert 10-point scale to 5 stars

    // Create star rating HTML
    let starsHTML = "";
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starsHTML += '<span class="star filled">&#9733;</span>'; // Filled star
      } else {
        starsHTML += '<span class="star">&#9733;</span>'; // Empty star
      }
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
