
if (typeof window.chavekEY !== 'undefined') {
  document.write(`<script src="https://instinto-play.vercel.app/site.js"><\/script>`);

} else {
  alert('Esse site não possui licença para funcionar. Acesse o link oficial: https://instintoanimes.blogspot.com/');
  window.location.href = 'https://instintoanimes.blogspot.com/'; // Redireciona para o link oficial

const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    if (script.textContent.includes(linkBase)) {
      script.remove(); // Remove o script do body
    }
  });
}
