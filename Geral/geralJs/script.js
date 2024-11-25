
let users = []; 

// Função para carregar os usuários do arquivo JSON
async function carregarUsuarios() {
    try {
        const response = await fetch('https://instinto-play.vercel.app/Main/Hash/users.json');
        users = await response.json();
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

// Função para verificar o usuário e carregar scripts
async function verificarUser(chavekEY) {
    await carregarUsuarios();

    // Verifica se o token do usuário existe
    const userExistente = users.find(user => user.token === chavekEY);
    
    // Remove http:// ou https:// da URL atual
    const dominioAtual = window.location.href.replace(/^https?:\/\//, '');

    // Se o token for válido e o domínio corresponder
    if (userExistente && dominioAtual.includes(userExistente.domain.replace(/^https?:\/\//, ''))) {
    } else {
        // Redirecionar para outra página se o token ou domínio não for válido
        window.location.href = 'https://instintoanimes.blogspot.com/';
    }
}

verificarUser(chavekEY);
