

// home

const API_KEY = '2018cef294a4077a7c4ab5a06a153826';
const BASE_URL = 'https://api.themoviedb.org/3';

let currentMoviePage = 1; // Página atual de filmes
let currentTVPage = 1; // Página atual de séries
let totalMoviePages = 0; // Total de páginas de filmes
let totalTVPages = 0; // Total de páginas de séries
let totalMovies = 0; // Total de postagens de filmes
let totalTVShows = 0; // Total de postagens de séries
let isSearching = false; // Flag para saber se está pesquisando

// Idiomas permitidos
const allowedLanguages = ['pt', 'en', 'ja', 'ko', 'fr', 'es', 'zh'];

async function fetchPopularMovies(page = 1) {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`);
    const data = await response.json();
    totalMovies = data.total_results; // Atualiza total de postagens de filmes
    totalMoviePages = Math.ceil(totalMovies / 20); // Total de páginas
    return data.results.filter(movie => allowedLanguages.includes(movie.original_language) && movie.poster_path); // Filtra por idiomas permitidos e verifica se há imagem
}

async function fetchPopularTVShows(page = 1) {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`);
    const data = await response.json();
    totalTVShows = data.total_results; // Atualiza total de postagens de séries
    totalTVPages = Math.ceil(totalTVShows / 20); // Total de páginas
    return data.results.filter(tvShow => allowedLanguages.includes(tvShow.original_language) && tvShow.poster_path); // Filtra por idiomas permitidos e verifica se há imagem
}

async function fetchMovies(query, page = 1) {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    const data = await response.json();
    totalMovies = data.total_results; // Atualiza total de postagens de filmes
    totalMoviePages = Math.ceil(totalMovies / 20); // Recalcula o total de páginas baseado na pesquisa
    return data.results.filter(movie => allowedLanguages.includes(movie.original_language) && movie.poster_path); // Filtra por idiomas permitidos e verifica se há imagem
}

async function fetchTVShows(query, page = 1) {
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&page=${page}`);
    const data = await response.json();
    totalTVShows = data.total_results; // Atualiza total de postagens de séries
    totalTVPages = Math.ceil(totalTVShows / 20); // Recalcula o total de páginas baseado na pesquisa
    return data.results.filter(tvShow => allowedLanguages.includes(tvShow.original_language) && tvShow.poster_path); // Filtra por idiomas permitidos e verifica se há imagem
}

function displayResults(results, containerId, isMovie = true) {
    const container = document.getElementById(containerId);
    if (results.length === 0) {
        container.innerHTML = '<p>Não há postagens disponíveis.</p>'; // Adiciona aviso se não houver resultados
        return;
    }
    
    container.innerHTML = results.map(result => {
        let category = '';
        let categoryClass = ''; // Variável para a classe do card

        if (!isMovie) { // Apenas para séries
            const originalLanguage = result.original_language;
            const isAnimation = result.genre_ids.includes(16); // Verifica se é um anime

            // Atribui a categoria e a classe com base no idioma
            if (isAnimation) {
                if (originalLanguage === 'ja' || originalLanguage === 'zh') {
                    category = '#Anime';
                    categoryClass = 'anime'; // Classe para anime
                } else if (['pt', 'en'].includes(originalLanguage)) {
                    category = '#Animação';
                    categoryClass = 'animação'; // Classe para animação
                } else {
                    category = '#Animação'; // Outros idiomas
                    categoryClass = 'animação'; // Classe para animação
                }
            } else {
                // Verifica se é uma série coreana que não é animação
                if (originalLanguage === 'ko') {
                    category = '#Dorama';
                    categoryClass = 'dorama'; // Classe para dorama
                } else {
                    category = '#Série'; // Para outras séries
                    categoryClass = 'serie'; // Classe para série
                }
            }
        } else { // Para filmes
            const originalLanguage = result.original_language;
            const isAnimation = result.genre_ids.includes(16); // Verifica se é uma animação

            if (isAnimation) {
                if (originalLanguage === 'ja') {
                    category = 'Filme - Anime'; // Para filmes do Japão (anime)
                    categoryClass = 'filme-anime'; // Classe para filme-anime
                } else {
                    category = 'Filme - Animação'; // Para outros filmes de animação
                    categoryClass = 'filme-animacao'; // Classe para filme-animação
                }
            } else {
                category = 'Filme'; // Para filmes comuns
                categoryClass = 'filme'; // Classe para filme
            }
        }

        return `
            <a href="${isMovie ? 'filme.html' : 'serie.html'}?data-id=${result.id}&${categoryClass}" class="card ${categoryClass}">
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}">
                <h3>${result.title || result.name}</h3>
                <h8 type="${category}">${isMovie ? category.replace('-', ' - ') : ''}</h8>
                <p>${result.release_date || result.first_air_date}</p>
            </a>
        `;
    }).join('');
}

function openDetailPage(card) {
    const id = card.getAttribute('data-id'); // Obtém o data-id do card
    const isMovie = card.classList.contains('filme'); // Verifica se é um filme
    const detailPage = isMovie ? 'filme.html' : 'serie.html'; // Define a página de detalhes com base no tipo
    window.location.href = `${detailPage}?data-id=${id}`; // Passa o data-id na URL
}


function updatePageInfo() {
    document.getElementById('current-movie-page').textContent = `Página ${currentMoviePage} de ${totalMoviePages}`;
    document.getElementById('current-tv-page').textContent = `Página ${currentTVPage} de ${totalTVPages}`;
    document.getElementById('load-prev-movies').disabled = currentMoviePage === 1; // Desabilitar botão se for a primeira página
    document.getElementById('load-prev-tv').disabled = currentTVPage === 1; // Desabilitar botão se for a primeira página
    document.getElementById('load-more-movies').disabled = currentMoviePage >= totalMoviePages; // Desabilitar se não houver próxima página
    document.getElementById('load-more-tv').disabled = currentTVPage >= totalTVPages; // Desabilitar se não houver próxima página
    document.getElementById('total-movies').textContent = `(${totalMovies})`; // Atualiza total de filmes
    document.getElementById('total-tv').textContent = `(${totalTVShows})`; // Atualiza total de séries
}

async function loadInitialContent() {
    const movies = await fetchPopularMovies(currentMoviePage);
    const tvShows = await fetchPopularTVShows(currentTVPage);
    
    displayResults(movies, 'movie-results', true);
    displayResults(tvShows, 'tv-results', false);
    updatePageInfo(); // Atualiza as informações da página
}

document.getElementById('search').addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    
    if (query) {
        isSearching = true; // Define que está pesquisando
        currentMoviePage = 1; // Reinicia a página ao buscar
        currentTVPage = 1; // Reinicia a página ao buscar
        const movies = await fetchMovies(query, currentMoviePage);
        const tvShows = await fetchTVShows(query, currentTVPage);
        
        displayResults(movies, 'movie-results', true);
        displayResults(tvShows, 'tv-results', false);
        updatePageInfo(); // Atualiza as informações da página
    } else {
        isSearching = false; // Define que não está mais pesquisando
        currentMoviePage = 1; // Reinicia a página ao buscar
        currentTVPage = 1; // Reinicia a página ao buscar
        loadInitialContent(); // Carrega o conteúdo inicial
    }
});

// Navegação de páginas para filmes
document.getElementById('load-more-movies').addEventListener('click', async () => {
    if (isSearching) {
        currentMoviePage++;
        const movies = await fetchMovies(document.getElementById('search').value.trim(), currentMoviePage);
        displayResults(movies, 'movie-results', true);
    } else {
        currentMoviePage++;
        const movies = await fetchPopularMovies(currentMoviePage);
        displayResults(movies, 'movie-results', true);
    }
    updatePageInfo(); // Atualiza as informações da página
});

document.getElementById('load-prev-movies').addEventListener('click', async () => {
    if (currentMoviePage > 1) {
        currentMoviePage--;
        if (isSearching) {
            const movies = await fetchMovies(document.getElementById('search').value.trim(), currentMoviePage);
            displayResults(movies, 'movie-results', true);
        } else {
            const movies = await fetchPopularMovies(currentMoviePage);
            displayResults(movies, 'movie-results', true);
        }
        updatePageInfo(); // Atualiza as informações da página
    }
});

// Navegação de páginas para séries
document.getElementById('load-more-tv').addEventListener('click', async () => {
    if (isSearching) {
        currentTVPage++;
        const tvShows = await fetchTVShows(document.getElementById('search').value.trim(), currentTVPage);
        displayResults(tvShows, 'tv-results', false);
    } else {
        currentTVPage++;
        const tvShows = await fetchPopularTVShows(currentTVPage);
        displayResults(tvShows, 'tv-results', false);
    }
    updatePageInfo(); // Atualiza as informações da página
});

document.getElementById('load-prev-tv').addEventListener('click', async () => {
    if (currentTVPage > 1) {
        currentTVPage--;
        if (isSearching) {
            const tvShows = await fetchTVShows(document.getElementById('search').value.trim(), currentTVPage);
            displayResults(tvShows, 'tv-results', false);
        } else {
            const tvShows = await fetchPopularTVShows(currentTVPage);
            displayResults(tvShows, 'tv-results', false);
        }
        updatePageInfo(); // Atualiza as informações da página
    }
});

// Carrega o conteúdo inicial ao iniciar
loadInitialContent();




window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 0) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});


async function verificaTrechosURL() {
    try {
        const response = await fetch('https://instinto-play.vercel.app/Main/Hash/permitidos.json');
        const data = await response.json();
        const urlAtual = window.location.href;

        console.log('URL Atual:', urlAtual);  // Log da URL atual para depuração

        const trechosPermitidos = data.permitidos;
        const algumTrechoPresente = trechosPermitidos.some(trecho => urlAtual.includes(trecho));

        console.log('Algum trecho permitido presente?', algumTrechoPresente); // Log da verificação

        if (!algumTrechoPresente) {
            window.location.href = 'https://instinto-play.vercel.app/Main/acessNegado.html';
        }
    } catch (error) {
        console.error("Erro ao carregar o arquivo JSON:", error);
        window.location.href = 'https://instinto-play.vercel.app/Main/acessNegado.html';
    }
}



// Função para verificar se o script `valida-ip.js` está presente
function verificaScriptValidaIP() {
    const scripts = document.querySelectorAll('script[src="/Gerador/valida-ip.js"]');
    if (scripts.length === 0) {
        window.location.href = 'https://instinto-play.vercel.app/Main/acessNegado.html';
    }
}

// Executa ambas as verificações
verificaTrechosURL();
verificaScriptValidaIP();



