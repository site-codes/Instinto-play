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
    "Ficção científica": "Ficção Científica"
};

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('data-id')
    };
}

async function fetchMovieDetails(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`);
    return await response.json();
}


async function loadMovieDetails() {
    const { id } = getQueryParams();
    const details = await fetchMovieDetails(id);

    // Exibindo detalhes do filme
    document.getElementById('filme-title').innerText = details.title;
    document.getElementById('poster').src = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
    document.getElementById('poster-link').value = `https://image.tmdb.org/t/p/w500${details.poster_path}`; 

    document.getElementById('title').value = details.title;
    document.getElementById('original-title').value = details.original_title;
    document.getElementById('overview').value = details.overview;
    document.getElementById('genres').value = translateGenres(details.genres.map(g => g.name));
    document.getElementById('release').value = details.release_date;
    document.getElementById('status').value = details.status === "Released" ? "Completo" : details.status === "In Production" ? "Em Pausa" : "Lançamento";
    document.getElementById('rating').value = (Math.round(details.vote_average * 10) / 10).toFixed(1); 
    document.getElementById('duration').value = details.runtime ? `${details.runtime} min` : ""; 
    document.getElementById('age-rating').value = details.adult ? "18+" : "Livre";
    document.getElementById('animeStudio').value = details.production_companies[0]?.name || '';



    // Obtendo diretor e roteirista
    const director = details.credits.crew.find(member => member.job === "Director");
    const writer = details.credits.crew.find(member => member.job === "Writer");
    document.getElementById('director').value = director ? director.name : ""; 
    document.getElementById('writer').value = writer ? writer.name : ""; 

    document.getElementById('producers').value = details.production_companies.length > 0 ? details.production_companies.map(pc => pc.name).join(', ') : ""; 


    /*
    // Preenchendo o elenco automaticamente
    const castContainer = document.getElementById('cast-container');
    castContainer.innerHTML = '';
    

    details.credits.cast.forEach(member => {
        const castMemberDiv = document.createElement('div');
        castMemberDiv.classList.add('cast-member');

        const profileImageUrl = member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : '';

        castMemberDiv.innerHTML = `
            <div class="cast">
                <label>Imagem:</label>
                <input type="url" value="${profileImageUrl}" placeholder="URL da imagem" />
                <label>Nome do Ator/Atriz:</label>
                <input type="text" value="${member.name}" />
                <label>Personagem:</label>
                <input type="text" value="${member.character}" />
            </div>
        `;
        castContainer.appendChild(castMemberDiv);
    });*/

    // Orçamento e Receita
    document.getElementById('budget').value = details.budget ? `R$ ${details.budget.toLocaleString('pt-BR')}` : "";
    document.getElementById('revenue').value = details.revenue ? `R$ ${details.revenue.toLocaleString('pt-BR')}` : "";
    document.getElementById('country').value = details.origin_country.join(', ');


    updatePageLink();
    updateTitlePlayerMovie();
}

function updateTitle() {
    const newTitle = document.getElementById('title').value;
    document.getElementById('filme-title').innerText = newTitle; 
}

// atualizar poster
function updatePoster() {
    const posterLink = document.getElementById('poster-link').value;
    document.getElementById('poster').src = posterLink;
}

// Nota com '.'
function formatRating() {
    const ratingInput = document.getElementById('rating');
    const ratingValue = parseFloat(ratingInput.value);
    if (ratingValue < 0 || ratingValue > 10) {
        ratingInput.value = ratingValue < 0 ? 0 : 10; 
    }
}


// titulo  dentro do player
function updateTitlePlayerMovie() {
    const title = document.getElementById('title').value;
    const subdub = document.getElementById('subdub').value; 
    const titlePlayerMovie = `${title} - ${subdub}`;
    document.getElementById('titlePlayerMovie').value = titlePlayerMovie;
}

document.getElementById('subdub').addEventListener('input', updateTitlePlayerMovie);

loadMovieDetails();
