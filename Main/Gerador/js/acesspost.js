

const BLOGGER_ACCESS_TOKEN = 'ya29.a0AeDClZCBpjsQOQ3LYxeYnXJFmIo7JbKaUYbMCAU9F02joBlU-0huKQsPz1OuAuA7GCAql7kKUkR2N0S_xoginthfdrlRSCKcxn2XRtA-PxE4v84Wi2bGIoXCvaBcEtTZemOFVmMKJoXoR4cWJLD0pN6gVpp8TChZH131-dQXaCgYKAU8SARMSFQHGX2Mi8jaaMiI95eJ1kiahP0orSA0175';
const BLOG_ID = '1263645809674600684';
const REFRESH_TOKEN = '1//04-ENXZFy3muTCgYIARAAGAQSNwF-L9IrYTAGC3Mr-2lTqfuTBiGHG6-iba1N0owelgmPT1LFHA-IO8b_EwhkldhJRqbkZC5J_ts'; 

function criarPostagemDoTexto() {
    const title = document.getElementById("title").value;
    const conteudoTexto = document.getElementById('exibir-pre').innerText;
    const genres = document.getElementById('genres').value;
    const subdub = document.getElementById("subdub").value;
    const banner = document.getElementById('banner').value;
    const rating = document.getElementById("rating").value;
    const animeStation = document.getElementById("animeStation").value;
    
    function formatReleaseAno(releaseAno) {
    const date = new Date(releaseAno);
    const year = date.getFullYear();
    return `${year}`;
  }
    const release = document.getElementById("release").value;
    const ano = formatReleaseAno(release);
    
    const selectedCategories = document.getElementById('selectedCategories').value;
    const publishedDate = `${release}T03:01:00.000Z`; 
    

    const postData = {
        title: `${title}`,
        content: `${conteudoTexto}`, 
        summary: 'Esta é a descrição da postagem que aparecerá nas pré-visualizações e pesquisas.', 
        labels: [`${banner} Filmes, Filme ${subdub}, Nota ${rating}, ${animeStation}, ${animeStation} ${ano}, ${ano}, ${genres}, ${selectedCategories}`],
        status: 'LIVE',
        published: publishedDate 
    };

    // Mostra a mensagem de carregamento
    mostrarMensagem('Criando postagem... Aguarde', 'info');

    // Chamada para a API do Blogger para criar a postagem
    $.ajax({
        url: `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/`,
        type: 'POST',
        headers: {
            'Authorization': `Bearer ${BLOGGER_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(postData),
        success: function(response) {
            mostrarMensagem('Postagem criada com sucesso!', 'success');
            console.log(response);
        },
        error: function(error) {
            mostrarMensagem('Erro ao criar postagem: ' + (error.responseText || 'Erro desconhecido'), 'error');
            console.log(error);
            // Tenta renovar o token caso ocorra um erro de permissão (expiração do token)
            if (error.status === 403) {
                renovarToken();
            }
        }
    });
}

function mostrarMensagem(mensagem, tipo) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = mensagem;
    
    if (tipo === 'success') {
        messageDiv.classList.add("sucess");
        messageDiv.classList.remove("load");
    } else if (tipo === 'error') {
        messageDiv.classList.add("error");
    } else {
        messageDiv.classList.add("load");
        messageDiv.classList.remove("error");
    }

    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000); 
}

function renovarToken() {
    const url = 'https://oauth2.googleapis.com/token';
    const data = {
        client_id: '24775042559-b1dh5stt5ujskpvhuh2srvn2avgrtf82.apps.googleusercontent.com', // Substitua com o seu Client ID
        client_secret: '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', // Substitua com o seu Client Secret
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token'
    };

    $.post(url, data, function(response) {
        BLOGGER_ACCESS_TOKEN = response.access_token; // Atualiza o token de acesso
        mostrarMensagem('Token renovado com sucesso!', 'success');
        console.log("Novo token de acesso:", BLOGGER_ACCESS_TOKEN);
    }).fail(function(error) {
        mostrarMensagem('Erro ao renovar o token: ' + (error.responseText || 'Erro desconhecido'), 'error');
        console.log(error);
    });
}
