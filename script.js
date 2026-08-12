/* ==========================================================================
   CONFIGURAÇÕES GERAIS EDITÁVEIS
   ========================================================================== */
// Número do WhatsApp da Barbearia (Apenas números: DDD + Telefone)
const WHATSAPP_NUMBER = "5511999999999";

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. MENU HAMBÚRGUER MOBILE
       ========================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================
       2. HEADER SCROLL E LINK ATIVO
       ========================================== */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Estilo do Header no Scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Ativar Link de Acordo com a Seção
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       3. MODAL DA GALERIA
       ========================================== */
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const modalClose = document.querySelector('.modal-close');

    galeriaItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.galeria-img');
            const caption = item.querySelector('.galeria-overlay span').innerText;
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalCaption.innerText = caption;
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar ao clicar fora da imagem
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    /* ==========================================
       4. FORMULÁRIO DE CONTATO VIA WHATSAPP
       ========================================== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (!nome || !email || !telefone) {
                alert('Por favor, preencha todos os campos obrigatórios (*).');
                return;
            }

            // Construção da mensagem automática
            let textoWhatsApp = `Olá! Meu nome é *${nome}*.\n`;
            textoWhatsApp += `E-mail: ${email}\n`;
            textoWhatsApp += `Telefone: ${telefone}\n\n`;
            
            if (mensagem) {
                textoWhatsApp += `*Mensagem:* ${mensagem}`;
            } else {
                textoWhatsApp += `Gostaria de saber mais informações sobre os serviços da barbearia.`;
            }

            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textoWhatsApp)}`;
            
            // Abre o WhatsApp em nova aba
            window.open(url, '_blank');

            // Limpa o formulário
            contactForm.reset();
        });
    }

    /* ==========================================
       5. ANIMAÇÃO SCROLL REVEAL (FADE IN)
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
});