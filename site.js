// Função para carregar um script dinamicamente
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(); // Resolve quando o script é carregado com sucesso
        script.onerror = () => reject(new Error(`Erro ao carregar o script: ${src}`)); // Rejeita se houver erro
        document.body.appendChild(script);
    });
}

// Array de scripts a serem carregados
const scriptsToLoad = [
    "https://instinto-play.vercel.app/Geral/geralJs/script01.js",
    "https://instinto-play.vercel.app/Geral/geralJs/script02.js",
    "https://instinto-play.vercel.app/Geral/geralJs/script03.js",
    "https://instinto-play.vercel.app/Geral/geralJs/script04.js",
    "https://instinto-play.vercel.app/Geral/geralJs/script05.js",
    "https://instinto-play.vercel.app/Geral/geralJs/script2.js",
    "https://instinto-play.vercel.app/Geral/geralJs/script.js"
];

// Função principal para carregar todos os scripts
async function loadScripts() {
    try {
        for (const scriptSrc of scriptsToLoad) {
            await loadScript(scriptSrc); // Tenta carregar cada script
        }
    } catch (error) {
        console.error(error.message);

        // Se o erro for relacionado ao script.js (último da lista), exibe a mensagem de indisponibilidade
        if (error.message.includes("script.js")) {
            document.body.innerHTML = "<h1>Esse site não está disponível no momento</h1>";
        }
    }
}

// Inicia o processo de carregamento dos scripts
loadScripts();
