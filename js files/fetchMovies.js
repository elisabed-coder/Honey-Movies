export async function fetchData(movieTitle) {
  const apiKey = "e6d88b55";
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
      movieTitle
    )}`
  );
  const movieData = await response.json();
  return movieData;
}
