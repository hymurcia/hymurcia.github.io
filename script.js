import { translations, typingPhrases } from './translations.js';

let currentLang = localStorage.getItem('portfolioLang') || 'es'; // Carga el idioma guardado o usa ES por defecto

// ===================================
// 1. Traducción Global
// ===================================

const langToggle = document.getElementById("lang-toggle");

// Función que actualiza todos los textos
function updateContent(lang) {
    // 1. Actualiza el contenido de los elementos con data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[key] && translations[key][lang]) {
            el.textContent = translations[key][lang];
        }
    });

    // 2. Actualiza el botón de idioma
    langToggle.dataset.lang = lang;
    langToggle.textContent = lang === 'es' ? 'EN' : 'ES';

    // 3. Reinicia el Typing Effect con las nuevas frases
    restartTypingEffect(lang);
}

// Evento para cambiar de idioma
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('portfolioLang', currentLang); // Guarda la preferencia
    updateContent(currentLang);
});


// ===================================
// 2. Modo Oscuro & Scroll Animation
// ===================================

const modeToggle = document.getElementById("mode-toggle");

// Asegura que el estado del modo oscuro se preserve
document.body.classList.toggle("dark", localStorage.getItem('darkMode') === 'true');
modeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";


modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    modeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem('darkMode', isDark); // Guarda la preferencia
});

const elements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.1 });

elements.forEach((el) => observer.observe(el));


// ===================================
// 3. Typing Effect Logic (Modificada)
// ===================================

const typingElement = document.querySelector(".typing-text");
let phrases = typingPhrases[currentLang]; // Usa las frases del idioma actual
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150; 
let timeoutId; // Para poder cancelar la animación

function type() {
    clearTimeout(timeoutId); // Limpia la animación anterior
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 200;
    } else {
        typingSpeed = isDeleting ? 75 : 150;
    }

    timeoutId = setTimeout(type, typingSpeed);
}

// Función para reiniciar el efecto al cambiar el idioma
function restartTypingEffect(newLang) {
    clearTimeout(timeoutId); // Detiene la animación anterior
    phrases = typingPhrases[newLang];
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typingElement.textContent = ""; // Borra el texto actual
    type(); // Inicia la nueva animación
}

document.addEventListener("DOMContentLoaded", () => {
    // Inicia la traducción y el typing effect al cargar
    updateContent(currentLang);
});


// ===================================
// 4. Botón "Volver Arriba" (Tu código)
// ===================================

const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '⬆️';
backToTopButton.id = 'back-to-top';
document.body.appendChild(backToTopButton);

// Estilos del botón flotante (mejor moverlos a style.css)
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 100;
`;

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
    }
});


  // Genera columnas dinámicamente
  const cascade = document.querySelector('.electro-cascade');
  const numColumns = Math.floor(window.innerWidth / 60); // separación entre columnas

  for (let i = 0; i < numColumns; i++) {
    const col = document.createElement('div');
    col.classList.add('electro-column');

    // posición horizontal
    col.style.left = `${i * 60}px`;

    // duración y delay aleatorios para naturalidad
    col.style.animationDuration = `${10 + Math.random() * 8}s`;
    col.style.animationDelay = `${Math.random() * -15}s`;

    cascade.appendChild(col);
  }

