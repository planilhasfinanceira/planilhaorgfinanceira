// Quiz Data
const quizData = {
    questions: [
        {
            id: 1,
            text: "Você sabe exatamente quanto entrou e quanto saiu do seu dinheiro no último mês?",
            options: [
                { emoji: "😊", text: "Sim, tenho tudo anotado com clareza" },
                { emoji: "🤷", text: "Tenho uma noção, mas nada organizado" },
                { emoji: "😔", text: "Não faço ideia, só vou gastando" }
            ]
        },
        {
            id: 2,
            text: "Quando o mês acaba, você sente que o dinheiro simplesmente \"sumiu\"?",
            options: [
                { emoji: "😔", text: "Sim, acontece direto" },
                { emoji: "🤷", text: "Às vezes, mas consigo me virar" },
                { emoji: "🤓", text: "Não, sei exatamente para onde foi" }
            ]
        },
        {
            id: 3,
            text: "Se nada mudar, como você imagina estar a sua vida financeira daqui a 6 meses?",
            options: [
                { emoji: "❌", text: "Mais endividado e frustrado" },
                { emoji: "😐", text: "Igual a hoje, sem evolução" },
                { emoji: "🤑", text: "Com controle e guardando dinheiro" }
            ]
        },
        {
            id: 4,
            text: "O que mais te impede de ter controle financeiro hoje?",
            options: [
                { emoji: "🤷", text: "Falta de organização" },
                { emoji: "🤷", text: "Não tenho uma ferramenta simples de controle" },
                { emoji: "❌", text: "Esqueço de anotar os gastos" },
                { emoji: "😂", text: "Acho complicado mexer com planilhas" }
            ]
        },
        {
            id: 5,
            text: "Se existisse uma planilha automática, que mostrasse exatamente para onde seu dinheiro está indo, você usaria?",
            options: [
                { emoji: "✅", text: "Sim, é exatamente o que eu preciso" },
                { emoji: "🤷", text: "Talvez, se fosse bem simples de usar" },
                { emoji: "❌", text: "Não sei, nunca tentei antes" }
            ]
        },
        {
            id: 6,
            text: "Você gostaria de ter acesso a essa planilha de forma imediata?",
            options: [
                { emoji: "✅", text: "Sim, quero organizar meu dinheiro" },
                { emoji: "😔", text: "Não, eu prefiro continuar com a minha vida financeira bagunçada" },
                { emoji: "😂", text: "Sim, mas preciso de algo bem fácil" }
            ]
        }
    ],
    testimonials: [
        {
            name: "Mariana Silva",
            location: "São Paulo - SP",
            text: "A planilha mudou minha relação com o dinheiro: em 1 mês já enxerguei onde eu gastava mais e reduzi despesas desnecessárias. Recomendo para quem quer começar sem complicação!!"
        },
        {
            name: "Lucas Melo",
            location: "Belo Horizonte - MG",
            text: "Simples de usar e muito prática. Consegui organizar minhas contas e criar um orçamento mensal que realmente funciona. Vale cada centavo!"
        },
        {
            name: "Fernanda Almeida",
            location: "Rio de Janeiro - RJ",
            text: "Eu sempre perdia controle das pequenas despesas. Com a planilha, passei a acompanhar tudo e já estou conseguindo guardar uma reserva mensal!!!"
        },
        {
            name: "André de Jesus",
            location: "Salvador - BA",
            text: "Exportei os dados do meu cartão e em 10 minutos tinha visão completa das categorias de gasto. Facilita demais o planejamento!"
        },
        {
            name: "Carla Bueno",
            location: "Goiás - GO",
            text: "Achei que organização financeira fosse complicado até usar essa planilha. Intuitiva e com relatórios que me ajudam a decidir melhor!!!!"
        }
    ]
};

// State Management
let currentQuestion = 0;

// Initialize
function init() {
    loadTestimonials();
}

// Start Quiz
function startQuiz() {
    currentQuestion = 0;
    showScreen('screen-question');
    loadQuestion(0);
}

// Load Question
function loadQuestion(index) {
    const question = quizData.questions[index];
    const progress = ((index + 1) / quizData.questions.length) * 100;
    
    // Update progress bar
    document.getElementById('progress-bar-question').style.width = progress + '%';
    
    // Update question counter and text
    document.getElementById('question-counter').textContent = `Pergunta ${index + 1} de ${quizData.questions.length}`;
    document.getElementById('question-text').textContent = question.text;
    
    // Clear and load options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, optionIndex) => {
        const optionCard = document.createElement('div');
        optionCard.className = 'option-card';
        optionCard.innerHTML = `
            <span class="option-emoji">${option.emoji}</span>
            <span class="option-text">${option.text}</span>
            <span class="option-arrow">→</span>
        `;
        optionCard.onclick = () => selectOption(index, optionIndex);
        optionsContainer.appendChild(optionCard);
    });
}

// Select Option
function selectOption(questionIndex, optionIndex) {
    // Wait 300ms before advancing
    setTimeout(() => {
        if (questionIndex < quizData.questions.length - 1) {
            currentQuestion++;
            loadQuestion(currentQuestion);
        } else {
            showOffer();
        }
    }, 300);
}

// Show Offer
function showOffer() {
    showScreen('screen-offer');
}

// Load Testimonials
function loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    container.innerHTML = '';
    
    quizData.testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        const firstLetter = testimonial.name.charAt(0);
        const stars = '⭐'.repeat(5);
        
        card.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-avatar">${firstLetter}</div>
                <div class="testimonial-info">
                    <div class="testimonial-name">${testimonial.name}</div>
                    <div class="testimonial-location">${testimonial.location}</div>
                </div>
            </div>
            <div class="testimonial-stars">${stars}</div>
            <p class="testimonial-text">"${testimonial.text}"</p>
        `;
        
        container.appendChild(card);
    });
}

// Handle Purchase
function handlePurchase() {
    window.location.href = 'https://pay.cakto.com.br/krqwehx_605988';
}

// Show Screen
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Initialize on load
init();