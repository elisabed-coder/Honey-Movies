export function createStarRating(imdbRating) {
  const rating = Math.round(parseFloat(imdbRating)) / 2;
  let starsHTML = "";
  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      starsHTML += '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>'; // Filled star
    } else if (rating >= i + 0.5) {
      starsHTML +=
        '<i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>'; // Half star
    }
  }
  return starsHTML;
}
