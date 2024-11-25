const API_KEY = '2018cef294a4077a7c4ab5a06a153826';
const BASE_URL = 'https://api.themoviedb.org/3';

const genreTranslation = {
    "Action": "Ação",
    "Adventure": "Aventura",
    "Animation": "Animação",
    "Comedy": "Comédia",
    "Crime": "Crime",
    "Documentary": "Documentário",
    "Drama": "Drama",
    "Family": "Família",
    "Fantasy": "Fantasia",
    "History": "História",
    "Horror": "Terror",
    "Music": "Música",
    "Mystery": "Mistério",
    "Romance": "Romance",
    "Science Fiction": "Ficção Científica",
    "TV Movie": "Filme para TV",
    "Thriller": "Suspense",
    "War": "Guerra",
    "Western": "Faroeste",
    "Kids": "Infantil",
    "Action & Adventure": "Ação & Aventura",
    "Sci-Fi & Fantasy": "Ficção Científica & Fantasia",
    "Mystery": "Mistério",
};

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('data-id')
    };
}

async function fetchSeriesDetails(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=pt-BR`);
    return await response.json();
}




async function loadSeriesDetails() {
    const { id } = getQueryParams();
    const details = await fetchSeriesDetails(id);

    document.getElementById('serie-title').innerText = details.name;
    document.getElementById('poster').src = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
    document.getElementById('animeStation').value = getSeason(details.first_air_date) || '';

    document.getElementById('title').value = details.name;
    document.getElementById('original-title').value = details.original_name;
    document.getElementById('overview').value = details.overview;
    document.getElementById('genres').value = translateGenres(details.genres.map(g => g.name));
    document.getElementById('status').value = details.status === "Ended" ? "Completo" : details.status === "In Production" ? "Em Pausa" : "Lançamento";
    document.getElementById('rating').value = (Math.round(details.vote_average * 10) / 10).toFixed(1);
    document.getElementById('seasons').value = details.number_of_seasons;
    document.getElementById('episodes').value = details.number_of_episodes;
    document.getElementById('release').value = details.first_air_date;
    document.getElementById('country').value = details.origin_country.join(', ');
    document.getElementById('poster-link').value = `https://image.tmdb.org/t/p/w500${details.poster_path}`;

    const seasonLinks = details.seasons.map((season, index) => 
        `Temporada ${index + 1}:\n` +
        (season.poster_path 
            ? `https://image.tmdb.org/t/p/w500${season.poster_path}` 
            : "Sem capa disponível")
    ).join('\n\n'); 
    
    document.getElementById('season-links').value = seasonLinks;
    updatePageLink();
}


function updateTitle() {
    const title = document.getElementById('title').value;
    document.getElementById('serie-title').innerText = title;
}

function updatePoster() {
    const posterLink = document.getElementById('poster-link').value;
    document.getElementById('poster').src = posterLink;
}


function formatRating() {
    const ratingInput = document.getElementById('rating');
    const ratingValue = parseFloat(ratingInput.value);
    if (ratingValue < 0 || ratingValue > 10) {
        ratingInput.value = ratingValue < 0 ? 0 : 10; // Limita o valor entre 0 e 10
    }
}



window.onload = loadSeriesDetails;
