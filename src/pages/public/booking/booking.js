export function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

export function populateUI(setSelectedSeatsCount) {
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    document.getElementById("movie").selectedIndex = selectedMovieIndex;
  }

  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    document.querySelectorAll(".seat").forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  updateSelectedCount(setSelectedSeatsCount);
}

export function updateSelectedCount(setSelectedSeatsCount) {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  setSelectedSeatsCount(selectedSeatsCount);

  const movieSelect = document.getElementById("movie");
  localStorage.setItem(
    "selectedSeats",
    JSON.stringify([...selectedSeats].map((seat) => [...document.querySelectorAll(".seat")].indexOf(seat)))
  );

  if (movieSelect) {
    localStorage.setItem("selectedMoviePrice", movieSelect.value);
  }
}
