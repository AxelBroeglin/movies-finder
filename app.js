
const moviesList = document.getElementById('charactersList');
let movies = [];

const loadMovies = async () => {
    try {
        const res = await fetch('https://api.themoviedb.org/3/movie/550?api_key=6306a5921402700a1b44ea0634197368');
        movies = await res.json();
        displayMovies(movies);
    } catch (err) {
        console.error(err);
    }
};

const displayMovies = (films) => {
    const htmlString = Array.from(films)
        .map((film) => {
            return `
            <li class="character">
                <h2>${film.name}</h2>
                <p>House: ${film.genres.name}</p>
            </li>
        `;
        })
        .join('');
    moviesList.innerHTML = htmlString;
};

loadMovies();

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keydown", e => {
  const searchString = e.target.value.toLowerCase();
  const filteredCharacters = movies.filter(film => {
    return (
      film.name.toLowerCase().includes(searchString) ||
      film.genres.names.toLowerCase().includes(searchString)
    );
  });
  displayMovies(filteredCharacters);
});

