
// const moviesList = document.getElementById('charactersList');
// let movies = [];

// const loadMovies = async () => {
//     try {
//         const res = await fetch('https://api.themoviedb.org/3/movie/550?api_key=6306a5921402700a1b44ea0634197368');
//         movies = await res.json();
//         displayMovies(movies);
//         console.log(movies);
//     } catch (err) {
//         console.error(err);
//     }
// };

// const displayMovies = (films) => {
//     const htmlString = Array.from(films)
//         .map((film) => {
//             return `
//             <li class="character">
//                 <h2>${film.name}</h2>
//                 <p>House: ${film.genres.name}</p>
//             </li>
//         `;
//         })
//         .join('');
//     moviesList.innerHTML = htmlString;
// };

// loadMovies();

// const searchBar = document.getElementById("searchBar");

// searchBar.addEventListener("keydown", e => {
//   const searchString = e.target.value.toLowerCase();
//   const filteredCharacters = movies.filter(film => {
//     return (
//       film.name.toLowerCase().includes(searchString) ||
//       film.genres.names.toLowerCase().includes(searchString)
//     );
//   });
//   displayMovies(filteredCharacters);
// });


const API_KEY = 'api_key=6306a5921402700a1b44ea0634197368';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const searchURL = BASE_URL + '/search/movie?'+API_KEY+'&query=';


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


//Gather data of popular movies
getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
        }    
    )
}

function showMovies(data){

    main.innerHTML = '';
    data.forEach(movie => {

        // Object destructuring : get a chosen set of info from an object
        const movieElt = document.createElement('div');
        movieElt.classList.add('movie');
        if(movie.poster_path == undefined || null){
            movieElt.style.display = "none";
        }else{
            movieElt.innerHTML = 
            '<img src="' + IMG_URL + movie.poster_path + '" alt="' + movie.title + '"><div class="movie-info"><h3>' + movie.title + '</h3><span class="' + getColor(movie.vote_average) + '">' + movie.vote_average + '</span></div><div class="overview"><h3>Overview</h3>'+ movie.overview + '</div>'
        }

        main.appendChild(movieElt);
    });
}

function getColor(vote){
    if(vote >=8){
        return 'green';
    }else if(vote >=5){
        return 'orange';
    }else{
        return 'red';
    }
}


form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    }
})




form.addEventListener("keyup", e => {
    let searchString = [];
    searchString.push(e.target.value.toLowerCase());

        console.log(searchString);
    
    const filteredMovies = searchString.filter(film => {

    return (
      film.includes(searchString)
    );
    
  });
  getMovies('https://api.themoviedb.org/3/search/movie?api_key=6306a5921402700a1b44ea0634197368&query='+filteredMovies);

  showMovies(filteredMovies);


  //IF SEARCH IS EMPTY BACK TO POPULAR MOVIES
    if(searchString.innerHTML == ''){
        getMovies(API_URL);
    }

});

// searchBar.addEventListener("keydown", e => {
//   const searchString = e.target.value.toLowerCase();
//   const filteredCharacters = movies.filter(film => {
//     return (
//       film.name.toLowerCase().includes(searchString) ||
//       film.genres.names.toLowerCase().includes(searchString)
//     );
//   });
//   displayMovies(filteredCharacters);
// });