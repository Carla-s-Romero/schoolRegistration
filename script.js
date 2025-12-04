// Elementos do DOM
const modal = document.getElementById('modalInscricao');
const btnsInscrever = [
    document.getElementById('btnInscrever'),
    document.getElementById('btnHeroInscrever'),
    document.getElementById('btnCtaInscrever')
];
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancelar = document.getElementById('btnCancelar');
const formInscricao = document.getElementById('formInscricao');
const header = document.getElementById('header');

// Abrir modal
btnsInscrever.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Fechar modal
const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    formInscricao.reset();
};

btnCloseModal.addEventListener('click', closeModal);
btnCancelar.addEventListener('click', closeModal);

// Fechar modal clicando fora
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header fixo com sombra ao rolar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Máscaras de input
const cnpjInput = document.getElementById('cnpj');
const telefoneInput = document.getElementById('telefone');

// Máscara CNPJ
cnpjInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 14) {
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    e.target.value = value;
});

// Máscara Telefone
telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 10) {
            value = value.replace(/^(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.replace(/^(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
    }
    
    e.target.value = value;
});

// Validação e envio do formulário
formInscricao.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        nomeInstituicao: document.getElementById('nomeInstituicao').value,
        cnpj: document.getElementById('cnpj').value,
        estado: document.getElementById('estado').value,
        cidade: document.getElementById('cidade').value,
        tipoInstituicao: document.getElementById('tipoInstituicao').value,
        numeroAlunos: document.getElementById('numeroAlunos').value,
        nomeResponsavel: document.getElementById('nomeResponsavel').value,
        cargoResponsavel: document.getElementById('cargoResponsavel').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        mensagem: document.getElementById('mensagem').value,
        termos: document.getElementById('termos').checked
    };
    
    // Validar CNPJ
    const cnpjLimpo = formData.cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) {
        alert('Por favor, insira um CNPJ válido com 14 dígitos.');
        return;
    }
    
    // Validar telefone
    const telefoneLimpo = formData.telefone.replace(/\D/g, '');
    if (telefoneLimpo.length < 10) {
        alert('Por favor, insira um telefone válido.');
        return;
    }
    
    // Validar termos
    if (!formData.termos) {
        alert('Você precisa aceitar os termos de uso para continuar.');
        return;
    }
    
    // Simular envio (aqui você integraria com um backend)
    console.log('Dados do formulário:', formData);
    
    // Mostrar mensagem de sucesso
    alert('Solicitação enviada com sucesso! Entraremos em contato em breve.');
    
    // Fechar modal e resetar formulário
    closeModal();
});

// Animação de entrada dos elementos ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.recurso-card, .beneficio-item, .depoimento-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// Validação de email em tempo real
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value && !emailRegex.test(e.target.value)) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '#d1d5db';
    }
});

// Prevenir reenvio do formulário ao pressionar Enter
formInscricao.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});
