function validateYouTubeLink() {
    const trailerInput = document.getElementById('trailer');
    const trailerLinkInput = document.getElementById('trailerLink');
    const errorMessage = document.getElementById('trailer-error');

    // Regex para validar link do YouTube
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    // Verifica se o link contém "https://youtu.be/" ou é um link válido
    if (youtubeRegex.test(trailerInput.value)) {
        const urlParams = new URLSearchParams(new URL(trailerInput.value).search);
        const videoId = urlParams.get('v') || trailerInput.value.split('/').pop();

        // Define o link embed
        trailerLinkInput.value = `https://www.youtube.com/embed/${videoId}`;
        errorMessage.style.display = 'none'; // Oculta a mensagem de erro
    } else {
        trailerLinkInput.value = ''; // Limpa o campo se o link for inválido
        errorMessage.style.display = 'block'; // Mostra a mensagem de erro
    }
}



// generos
function translateGenres(genres) {
    return genres.map(genre => genreTranslation[genre] || genre).join(', ').replace(/&/g, ', ');
}

// capas links
function getSeasonLinks() {
    const seasonLinks = document.getElementById('season-links').value.split('\n');
    return seasonLinks.map(link => link.trim()).filter(link => link); // Remove links vazios
}


// estaçao
function getSeason(airDate) {
    const month = new Date(airDate).getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Primavera';
    if (month >= 6 && month <= 8) return 'Verão';
    if (month >= 9 && month <= 11) return 'Outono';
    return 'Inverno';
}

// capturar informaçoes

// data mes e ano
function formatReleaseDate(releaseDate) {
    const date = new Date(releaseDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    return `/${year}/${month}/`;
}
// data ano
function formatReleaseAno(releaseAno) {
    const date = new Date(releaseAno);
    const year = date.getFullYear();
    return `${year}`;
}
// data brasil
function formatDateToBR(dateString) {
    const [year, month, day] = dateString.split('-'); // Divide a string em partes
    return `${day}/${month}/${year}`; // Retorna no formato DD/MM/YYYY
}
function formatDateToBRShort(dateString) {
    // Cria uma nova data sem considerar a hora (forçando a hora para 00:00)
    const date = new Date(dateString + 'T00:00:00'); // A string T00:00:00 força a hora para a meia-noite
    const options = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    };
    const formattedDate = date.toLocaleDateString('pt-BR', options); // Formata a data no padrão brasileiro
    return formattedDate; // Mantém o ponto após o mês abreviado
}

function normalizeTitle(title) {
    // Remove acentos
    const normalized = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Substitui o '&' por 'e' antes de realizar as outras substituições
    return normalized.toLowerCase()
        .replace(/&/g, 'e')               // Substitui '&' por 'e'
        .replace(/\s+/g, '-')             // Substitui espaços por hífens
        .replace(/[^\w\-]+/g, '')         // Remove caracteres não alfanuméricos e hífens
        .replace(/-+$/, '');              // Remove hífens no final
}


function updatePageLink() {
    const releaseYearMonth = formatReleaseDate(document.getElementById('release').value);
    const title = normalizeTitle(document.getElementById('title').value); // Normaliza o título
    const subdubValue = document.getElementById('subdub').value.toLowerCase(); // Transforma subdub em minúsculas

    // Adiciona '-dublado' ao pageLink apenas se subdub for 'Dublado'
    const subdubLink = subdubValue === 'dublado' ? '-dublado' : '';
    document.getElementById('pageLink').value = `${releaseYearMonth}${title}${subdubLink}`.trim();
}


    // Banner adicojnar
    document.getElementById("bannerSelect").addEventListener("change", function() {
        const bannerInput = document.getElementById("banner");
        if (this.value === "sim") {
            bannerInput.value = "Banner,";
        } else {
            bannerInput.value = "";
        }
    });



    // copiar code
    function copiarTexto() {
        const texto = document.getElementById("exibir-pre").innerText;
        navigator.clipboard.writeText(texto)
            .then(() => {
                alert("Texto copiado com sucesso!");
            })
            .catch(err => {
                console.error("Erro ao copiar o texto: ", err);
            });
    }


    

// CARREGAR IMAGENS WALLPAPERS
// Função para atualizar a imagem com base no valor do input
function updateImage(input) {
    const imageUrl = input.value; // Pega o valor do input
    const imageElement = input.closest('.input-group').querySelector('.imagePreview'); // Encontra a imagem associada
    if (imageUrl) {
        imageElement.src = imageUrl; // Atualiza o src da imagem
        imageElement.style.display = 'flex'; // Exibe a imagem
        imageElement.parentElement.href = imageUrl; // Atualiza o link da imagem
    }
}

window.addEventListener('load', () => {
    const inputs = document.querySelectorAll('.linkcapa'); // Seleciona todos os inputs com a classe linkcapa
    inputs.forEach(input => {
        const imageElement = input.closest('.input-group').querySelector('.imagePreview'); // Seleciona a imagem correspondente
        const imageUrl = input.value; // Pega o valor do input
        if (imageUrl) {
            imageElement.src = imageUrl;  // Atualiza o src da imagem
            imageElement.style.display = 'flex'; // Exibe a imagem
            imageElement.parentElement.href = imageUrl; // Atualiza o link da imagem
        }
    });
});


document.getElementById('release').addEventListener('input', updatePageLink);
document.getElementById('title').addEventListener('input', updatePageLink);
document.getElementById('subdub').addEventListener('change', updatePageLink);






// GENEROS
// Função para verificar categorias
function checkCategories() {
    const categoryInput = document.getElementById('selectedCategories');  // Pega o valor do input de categorias
    const categoryValues = categoryInput.value.toLowerCase().split(',').map(val => val.trim()); // Separa os valores digitados no input

    // Pega todos os labels dentro do container com id "categoria"
    const categoryLabels = document.querySelectorAll('#categoria label');

    categoryLabels.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]'); // Pega o checkbox dentro do label
        const checkboxValue = checkbox.value.toLowerCase(); // Valor do checkbox (em minúsculo para garantir a comparação correta)

        // Verifica se o valor do checkbox está na lista de valores digitados
        if (categoryValues.includes(checkboxValue)) {
            label.classList.add('check');  // Adiciona a classe .check ao label
            checkbox.checked = true; // Marca o checkbox
        } else {
            label.classList.remove('check');  // Remove a classe .check do label
            checkbox.checked = false; // Desmarca o checkbox
        }
    });
}

// Função para atualizar categorias no campo de texto
function updateCategories(event) {
    const checkbox = event.target;
    const categoryInput = document.getElementById('selectedCategories');
    let currentValues = categoryInput.value ? categoryInput.value.split(',').map(val => val.trim()) : [];  // Verifica se o campo já possui valor

    const checkboxValue = checkbox.value.trim();
    const label = checkbox.closest('label');

    if (checkbox.checked) {
        // Se for o primeiro item, simplesmente coloca o valor
        if (currentValues.length === 0) {
            categoryInput.value = checkboxValue;
        } else {
            // Se já houver valores, adiciona o valor com vírgula
            categoryInput.value = currentValues.join(', ') + ', ' + checkboxValue;
        }
        label.classList.add('check');
    } else {
        const index = currentValues.indexOf(checkboxValue);
        if (index !== -1) {
            currentValues.splice(index, 1);
            categoryInput.value = currentValues.join(', ');
        }
        label.classList.remove('check');
    }
}


// Adiciona ouvinte de evento para monitorar mudanças nos checkboxes de categorias
const categoryCheckboxes = document.querySelectorAll('#categoria input[type="checkbox"]');
categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCategories); // Detecta quando o checkbox de categorias for alterado
});

// Adiciona ouvinte de evento para monitorar mudanças no input de categorias
document.getElementById('selectedCategories').addEventListener('input', checkCategories);

// Função para verificar gêneros
function checkGenres() {
    const genreInput = document.getElementById('genres');  // Pega o valor do input de gêneros
    const genreValues = genreInput.value.toLowerCase().split(',').map(val => val.trim()); // Separa os valores digitados no input

    // Pega todos os labels dentro do container com id "genero"
    const genreLabels = document.querySelectorAll('#genero label');

    genreLabels.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]'); // Pega o checkbox dentro do label
        const checkboxValue = checkbox.value.toLowerCase(); // Valor do checkbox (em minúsculo para garantir a comparação correta)

        // Verifica se o valor do checkbox está na lista de valores digitados
        if (genreValues.includes(checkboxValue)) {
            label.classList.add('check');  // Adiciona a classe .check ao label
            checkbox.checked = true; // Marca o checkbox
        } else {
            label.classList.remove('check');  // Remove a classe .check do label
            checkbox.checked = false; // Desmarca o checkbox
        }
    });
}

// Função para atualizar gêneros no campo de texto
function updateGenres(event) {
    const checkbox = event.target; // O checkbox que foi clicado
    const genreInput = document.getElementById('genres');  // Pega o input de gêneros
    let currentValues = genreInput.value.split(',').map(val => val.trim()); // Pega os valores atuais no input

    const checkboxValue = checkbox.value.trim();
    const label = checkbox.closest('label');  // Valor do checkbox

    if (checkbox.checked) {
        // Se o checkbox for marcado e o valor não estiver no input, adiciona
        if (!currentValues.includes(checkboxValue)) {
            currentValues.push(checkboxValue); // Adiciona o valor ao array
            genreInput.value = currentValues.join(', ');  // Atualiza o input com os novos valores
        }
        label.classList.add('check');
    } else {
        // Se o checkbox for desmarcado, remove o valor
        const index = currentValues.indexOf(checkboxValue);
        if (index !== -1) {
            currentValues.splice(index, 1); // Remove o valor
            genreInput.value = currentValues.join(', ');  // Atualiza o input com os novos valores
        }
        label.classList.remove('check');
    }
}

// Adiciona ouvinte de evento para monitorar mudanças nos checkboxes de gêneros
const genreCheckboxes = document.querySelectorAll('#genero input[type="checkbox"]');
genreCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateGenres); // Detecta quando o checkbox de gêneros for alterado
});

// Adiciona ouvinte de evento para monitorar mudanças no input de gêneros
document.getElementById('genres').addEventListener('input', checkGenres);

window.addEventListener('load', () => {
    checkCategories(); // Atualiza categorias
    checkGenres(); // Atualiza gêneros
});






        // Função para atualizar a imagem do input
        function updateInputImage() {
            var category = document.getElementById('category').innerText; // Obtém o texto do parágrafo
            var inputcapaplay = document.getElementById('capaplay'); 
            var inputcapause = document.getElementById('capapause'); 

            if (category.includes('Filme')) {
                if (category.includes('Animação')) {
                    inputcapaplay.value = 'https://instinto-play.vercel.app/Imagens/animacaoPlay.png';
                    inputcapause.value = 'https://instinto-play.vercel.app/Imagens/animacaoPause.png';
                } else if (category.includes('Anime')) {
                    inputcapaplay.value = 'https://instinto-play.vercel.app/Imagens/animePlay.png';
                    inputcapause.value = 'https://instinto-play.vercel.app/Imagens/animePause.png';
                } else {
                    inputcapaplay.value = 'https://instinto-play.vercel.app/Imagens/moviePlay.png';
                    inputcapause.value = 'https://instinto-play.vercel.app/Imagens/moviePause.png';
                }
            }

            updateImage(inputcapaplay);
            updateImage(inputcapause);
        }
    
        window.onload = updateInputImage;





// REDIRECIONAR PAGINA
function verificaScriptValidaIP() {
    const scripts = document.querySelectorAll('script[src="/Gerador/valida-ip.js"]');
    if (scripts.length === 0) {
        window.location.href = '/acessNegado.html';
    }
}
verificaScriptValidaIP();

