const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// const main = document.querySelector('main');         Used for tag name when id is not mentioned
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
// const search = document.querySelector('search');

// Intially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    // respData.results.forEach(movie => {
    //     const img = document.createElement('img');
    //     img.src = IMGPATH + movie.poster_path;
    //     document.body.appendChild(img);
    // });

    showMovies(respData.results);

    // return respData;
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchItem = search.value;
    if (searchItem) {
        getMovies(SEARCHAPI + searchItem);
        search.value = "";
    } else {

    }
});


function showMovies(movies) {
    // Clear main
    main.innerHTML = '';

    movies.forEach((movie) => {

        // const { poster_path, title, vote_average } = movie;

        const movieEle = document.createElement('div');
        movieEle.classList.add('movie');
        movieEle.innerHTML = `
        <img src="${IMGPATH + movie.poster_path}" alt="${movie.title}">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class="${getRate(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            ${ movie.overview }
        </div>
            `;
        main.appendChild(movieEle);
    });
}

function getRate(rate) {
    if (rate >= 8) {
        return 'green';
    }
    else if (rate > 7)
        return 'orange';
    else
        return 'red';
}