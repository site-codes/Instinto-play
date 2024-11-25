// TEMA MODELO ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function applyTheme(theme) {
    const root = document.documentElement;
    const themeOptions = document.querySelectorAll('.theme-option');
    const htmlS = document.querySelector('.htmlS'); // Seleciona o elemento .htmlS

    // Remove a classe .selected de todos os temas
    themeOptions.forEach(option => option.classList.remove('selected'));

    // Adiciona a classe .selected ao tema selecionado
    document.getElementById(theme).classList.add('selected');
    
    // Remove classes de tema anteriores do elemento .htmlS
    htmlS.classList.remove('tema1', 'tema2', 'tema3');

    // Adiciona a classe correspondente ao tema selecionado
    if (theme === "tema1") {
        root.style.removeProperty("--headC");
        root.style.removeProperty("--bodyD");
        root.style.removeProperty("--bodyB");
        root.style.removeProperty("--linkC");
        root.style.removeProperty("--linkB");
        root.style.removeProperty("--linkA");
        root.style.removeProperty("--linkD");
        root.style.removeProperty("--cor1");
        root.style.removeProperty("--cor2");
        root.style.removeProperty("--corB1");
        root.style.removeProperty("--corB2");
        root.style.removeProperty("--corB3");
        root.style.removeProperty("--mobileM");
        root.style.removeProperty("--mobileC");
        root.style.removeProperty("--mobileD");
        root.style.removeProperty("--contentB");
    } else if (theme === "tema2") {
        root.style.setProperty("--headC", "var(--headCTema2)");
        root.style.setProperty("--bodyD", "var(--bodyDTema2)");
        root.style.setProperty("--bodyB", "var(--bodyBTema2)");
        root.style.setProperty("--linkC", "var(--linkCTema2)");
        root.style.setProperty("--linkB", "var(--linkBTema2)");
        root.style.setProperty("--linkA", "var(--linkATema2)");
        root.style.setProperty("--linkD", "var(--linkDTema2)");
        root.style.setProperty("--cor1", "var(--cor1Tema2)");
        root.style.setProperty("--cor2", "var(--cor2Tema2)");
        root.style.setProperty("--corB1", "var(--corB1Tema2)");
        root.style.setProperty("--corB2", "var(--corB2Tema2)");
        root.style.setProperty("--corB3", "var(--corB3Tema2)");
        root.style.setProperty("--mobileM", "var(--mobileMTema2)");
        root.style.setProperty("--mobileC", "var(--mobileCTema2)");
        root.style.setProperty("--mobileD", "var(--mobileDTema2)");
        root.style.setProperty("--contentB", "var(--contentBTema2)");
        htmlS.classList.add('tema2');
    } else if (theme === "tema3") {
        root.style.setProperty("--headC", "var(--headCTema3)");
        root.style.setProperty("--bodyD", "var(--bodyDTema3)");
        root.style.setProperty("--bodyB", "var(--bodyBTema3)");
        root.style.setProperty("--linkC", "var(--linkCTema3)");
        root.style.setProperty("--linkB", "var(--linkBTema3)");
        root.style.setProperty("--linkA", "var(--linkATema3)");
        root.style.setProperty("--linkD", "var(--linkDTema3)");
        root.style.setProperty("--cor1", "var(--cor1Tema3)");
        root.style.setProperty("--cor2", "var(--cor2Tema3)");
        root.style.setProperty("--corB1", "var(--corB1Tema3)");
        root.style.setProperty("--corB2", "var(--corB2Tema3)");
        root.style.setProperty("--corB3", "var(--corB3Tema3)");
        root.style.setProperty("--mobileM", "var(--mobileMTema3)");
        root.style.setProperty("--mobileC", "var(--mobileCTema3)");
        root.style.setProperty("--mobileD", "var(--mobileDTema3)");
        root.style.setProperty("--contentB", "var(--contentBTema3)");
        htmlS.classList.add('tema3');
    }
    
    // Salva a escolha do tema no localStorage
    localStorage.setItem('selectedTheme', theme);
}

// Aplica o tema salvo ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('tema1'); // Aplica o tema padrão se nenhum tema estiver salvo
    }
});