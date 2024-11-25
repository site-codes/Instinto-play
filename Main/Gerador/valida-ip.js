// Função para capturar o IP atual do usuário
async function fetchCurrentIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Erro ao capturar o IP:", error);
    }
}

// Função para carregar o script adicional
function loadAdditionalScript() {
    const script = document.createElement('script');
    script.src = 'js/script.js'; // Caminho do script adicional
    document.head.appendChild(script);
}

// Função para verificar se o IP está na lista de usuários
async function checkAccess() {
    const currentIP = await fetchCurrentIP();

    // Carregar o arquivo JSON contendo os usuários
    const response = await fetch('https://instinto-play.vercel.app/Main/Hash/users.json');
    const users = await response.json();

    // Verificar se o IP do usuário está na lista
    const user = users.find(u => u.ip === currentIP);

    // Se o IP estiver na lista
    if (user) {
        // Carregar o script adicional
        loadAdditionalScript();

        // Adicionar `idBlogger` à URL se ainda não estiver presente
        const currentUrl = new URL(window.location.href);
        if (!currentUrl.searchParams.has('idBlogger')) {
            currentUrl.searchParams.set('idBlogger', user.idBlogger);
            window.history.replaceState({}, document.title, currentUrl);
        }
        updateInputImage();
    } else {
        // Redirecionar para a página de acesso negado
        window.location.href = 'https://instinto-play.vercel.app/Main/acessNegado.html';
    }
}



// Verificar acesso quando a página carregar
window.onload = checkAccess;
