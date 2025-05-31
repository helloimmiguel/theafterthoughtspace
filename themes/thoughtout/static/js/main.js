

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.querySelector('nav.navbar > a:nth-child(5)'); // Botão de alternância de tema

    // Função para aplicar o tema (light ou dark)
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (themeToggle) {
                themeToggle.innerHTML = '🌙'; // Ícone para tema escuro
            }
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            if (themeToggle) {
                themeToggle.innerHTML = '☀️'; // Ícone para tema claro
            }
            localStorage.setItem('theme', 'light');
        }
    };

    // Carrega o tema salvo no localStorage ou usa preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // Adiciona evento de clique para alternar o tema
    if (themeToggle) {
        themeToggle.addEventListener('click', (event) => {
            event.preventDefault(); // Evita navegação padrão do link
            if (body.classList.contains('dark-theme')) {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        });
    }
    
    const switcher = document.getElementById('language-switcher');
  if (!switcher) return;

  const currentLang = document.documentElement.lang || 'pt';
  const targetLang = currentLang === 'pt' ? 'en' : 'pt';

  const currentURL = window.location.pathname;

  let targetURL;

  if (currentURL.startsWith(`/${currentLang}/`)) {
    targetURL = currentURL.replace(`/${currentLang}/`, `/${targetLang}/`);
  } else if (currentURL === '/' || currentURL === '') {
    targetURL = `/${targetLang}/`;
  } else {
    targetURL = `/${targetLang}${currentURL}`;
  }

  switcher.href = targetURL;

  // Bandeirinhas via emoji Unicode:
  const flags = {
    pt: "🇧🇷",
    en: "🇬🇧" 
  };

  switcher.textContent = flags[targetLang] || targetLang.toUpperCase();
});

