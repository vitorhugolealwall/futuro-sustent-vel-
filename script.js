// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Validação e envio do formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Simulando envio do formulário
        const inputs = this.querySelectorAll('input, textarea');
        const isValid = Array.from(inputs).every(input => input.value.trim() !== '');
        
        if (isValid) {
            alert('Obrigado pelo seu interesse! Entraremos em contato em breve.');
            this.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

// Efeito de aparecimento ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards e elementos com fade-in
document.querySelectorAll('.card, .pratica-card, .beneficio').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Menu mobile responsivo
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'menu-toggle';
            toggle.innerHTML = '☰';
            
            const navContainer = document.querySelector('.navbar .container');
            navContainer.appendChild(toggle);
            
            toggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            
            // Fechar menu ao clicar em um link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }
    }
}

window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Adicionar animação de contador para estatísticas (se houver)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Logger de eventos para analytics
function logEvent(eventName, data = {}) {
    console.log(`Evento: ${eventName}`, data);
    // Aqui você poderia enviar para um serviço de analytics
}

// Rastrear cliques nos botões principais
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        logEvent('button_click', { buttonText: btn.textContent });
    });
});

console.log('Site de Agricultura Sustentável carregado com sucesso!');
