// Dados do cardápio com links de imagens reais
const menuItems = [
    {
        id: 1,
        name: "Hambúrguer Clássico",
        description: "Pão, hambúrguer 180g, queijo, alface e tomate",
        price: 24.90,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        category: "Lanches",
        rating: 4.5,
        reviews: 128,
        reviewsList: [
            { user: "João Silva", rating: 5, comment: "Perfeito! Melhor hambúrguer da cidade." },
            { user: "Maria Souza", rating: 4, comment: "Muito bom, mas poderia ter mais molho." }
        ]
    },
    {
        id: 2,
        name: "Pizza Margherita",
        description: "Molho de tomate, mussarela, manjericão",
        price: 49.90,
        image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Pizzas",
        rating: 4.8,
        reviews: 95,
        reviewsList: [
            { user: "Carlos Oliveira", rating: 5, comment: "Massa perfeita e ingredientes frescos!" }
        ]
    },
    {
        id: 3,
        name: "Sushi Variado",
        description: "10 peças de sushi variado com wasabi e gengibre",
        price: 39.90,
        image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        category: "Japonesa",
        rating: 4.7,
        reviews: 76,
        reviewsList: [
            { user: "Ana Tanaka", rating: 5, comment: "Fresco e delicioso, recomendo!" }
        ]
    },
    {
        id: 4,
        name: "Salada Caesar",
        description: "Alface romana, croutons, parmesão e molho caesar",
        price: 22.90,
        image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Saudável",
        rating: 4.2,
        reviews: 42,
        reviewsList: []
    },
    {
        id: 5,
        name: "Brownie com Sorvete",
        description: "Brownie quente com sorvete de creme e calda de chocolate",
        price: 18.90,
        image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        category: "Sobremesas",
        rating: 4.9,
        reviews: 113,
        reviewsList: [
            { user: "Pedro Rocha", rating: 5, comment: "A combinação perfeita de quente e frio!" }
        ]
    },
    {
        id: 6,
        name: "Hambúrguer Bacon",
        description: "Pão, hambúrguer 180g, queijo, bacon crocante",
        price: 28.90,
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Lanches",
        rating: 4.6,
        reviews: 87,
        reviewsList: []
    },
    {
        id: 7,
        name: "Pizza Calabresa",
        description: "Molho de tomate, mussarela, calabresa e cebola",
        price: 54.90,
        image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        category: "Pizzas",
        rating: 4.4,
        reviews: 68,
        reviewsList: []
    },
    {
        id: 8,
        name: "Temaki Salmão",
        description: "Temaki de salmão com cream cheese e cebolinha",
        price: 19.90,
        image: "https://images.pexels.com/photos/8951563/pexels-photo-8951563.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Japonesa",
        rating: 4.3,
        reviews: 34,
        reviewsList: []
    }
];

// Carrinho de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos do DOM
const menuGrid = document.getElementById('menu-items');
const cartBtn = document.getElementById('cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const loginForm = document.getElementById('login-form');
const registerLink = document.getElementById('register-link');
const registerModal = document.getElementById('register-modal');
const closeRegister = document.getElementById('close-register');
const registerForm = document.getElementById('register-form');
const loginLink = document.getElementById('login-link');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const resetFilters = document.getElementById('reset-filters');
const reviewsModal = document.getElementById('reviews-modal');
const closeReviews = document.getElementById('close-reviews');
const reviewsTitle = document.getElementById('reviews-title');
const reviewsList = document.getElementById('reviews-list');
const ratingStars = document.querySelectorAll('.rating-stars i');
const reviewComment = document.getElementById('review-comment');
const submitReview = document.getElementById('submit-review');
const carouselTrack = document.getElementById('carousel-track');

let currentItemId = null;
let selectedRating = 0;
let currentSlide = 0;

const categoryItems = [
    {
        name: "Lanches",
        emoji: "🍔",
        color: "#FF9F1C"
    },
    {
        name: "Pizzas",
        emoji: "🍕",
        color: "#E71D36"
    },
    {
        name: "Japonesa",
        emoji: "🍣",
        color: "#2EC4B6"
    },
    {
        name: "Saudável",
        emoji: "🥗",
        color: "#06D6A0"
    },
    {
        name: "Sobremesas",
        emoji: "🍰",
        color: "#FF9E00"
    },
];

// Função para inicializar o carousel
function initCarousel() {
    carouselTrack.innerHTML = '';

    categoryItems.forEach((item, index) => {
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('category-item');
        categoryItem.innerHTML = `
            <span class="category-emoji" style="color: ${item.color}">${item.emoji}</span>
            <span class="category-name">${item.name}</span>
        `;
        
        categoryItem.addEventListener('click', () => {
            categoryFilter.value = item.name;
            loadMenuItems(item.name, priceFilter.value);
        });
        
        carouselTrack.appendChild(categoryItem);
    });

    updateCarousel();
}

// Função para atualizar a posição do carousel
function updateCarousel() {
    const itemWidth = document.querySelector('.category-item').offsetWidth;
    const gap = 15;
    const offset = currentSlide * (itemWidth + gap);
    carouselTrack.style.transform = `translateX(-${offset}px)`;
}

// Função para avançar slides
function nextSlide() {
    const totalItems = categoryItems.length;
    const visibleItems = Math.floor(carouselTrack.offsetWidth / (document.querySelector('.category-item').offsetWidth + 15));

    if (currentSlide < totalItems - visibleItems) {
        currentSlide++;
        updateCarousel();
    }
}

// Função para retroceder slides
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

// Carregar itens do cardápio
function loadMenuItems(category = 'all', priceRange = 'all') {
    menuGrid.innerHTML = '';

    let filteredItems = [...menuItems];

    // Aplicar filtro de categoria
    if (category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }

    // Aplicar filtro de preço
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);

        filteredItems = filteredItems.filter(item => {
            if (priceRange.endsWith('+')) {
                return item.price >= min;
            }
            return item.price >= min && item.price <= max;
        });
    }

    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-price">
                    <span class="price">R$ ${item.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${item.id}">Adicionar</button>
                </div>
            </div>
            <div class="item-rating" data-id="${item.id}">
                ${generateRatingStars(item.rating || 0)}
                <span>(${item.reviews || 0} avaliações)</span>
            </div>
        `;

        menuGrid.appendChild(menuItem);
    });

    // Adicionar eventos aos botões de adicionar ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Adicionar evento para abrir avaliações
    document.querySelectorAll('.item-rating').forEach(rating => {
        rating.addEventListener('click', () => {
            const itemId = parseInt(rating.getAttribute('data-id'));
            showReviews(itemId);
        });
    });
}

// Gerar estrelas de avaliação
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Adicionar item ao carrinho
function addToCart(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const item = menuItems.find(item => item.id === id);

    // Verificar se o item já está no carrinho
    const existingItem = cart.find(cartItem => cartItem.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCart();

    // Feedback visual
    const button = e.target;
    button.textContent = 'Adicionado!';
    button.style.backgroundColor = '#4CAF50';

    setTimeout(() => {
        button.textContent = 'Adicionar';
        button.style.backgroundColor = '#ea1d2c';
    }, 1000);
}

// Atualizar carrinho
function updateCart() {
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">&times;</button>
        `;

        cartItems.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Salvar no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Adicionar eventos aos botões de quantidade e remoção
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Diminuir quantidade
function decreaseQuantity(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === id);

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

// Aumentar quantidade
function increaseQuantity(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === id);

    item.quantity += 1;
    updateCart();
}

// Remover item
function removeItem(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Mostrar avaliações
function showReviews(itemId) {
    currentItemId = itemId;
    const item = menuItems.find(item => item.id === itemId);

    reviewsTitle.textContent = `Avaliações: ${item.name}`;
    reviewsList.innerHTML = '';

    if (item.reviewsList && item.reviewsList.length > 0) {
        item.reviewsList.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <div class="review-user">${review.user}</div>
                <div>${generateRatingStars(review.rating)}</div>
                <div class="review-comment">${review.comment}</div>
            `;
            reviewsList.appendChild(reviewItem);
        });
    } else {
        reviewsList.innerHTML = '<p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>';
    }

    // Resetar formulário
    selectedRating = 0;
    reviewComment.value = '';
    ratingStars.forEach(star => {
        star.classList.remove('active');
    });

    reviewsModal.style.display = 'flex';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    loadMenuItems();
    updateCart();

    // Carrinho
    cartBtn.addEventListener('click', () => {
        cartOverlay.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    // Login
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Cadastro
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });

    closeRegister.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    // Fechar modais ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.style.display = 'none';
        }

        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }

        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }

        if (e.target === reviewsModal) {
            reviewsModal.style.display = 'none';
        }
    });

    // Formulário de login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulação de login
        if (email && password) {
            alert('Login realizado com sucesso!');
            loginModal.style.display = 'none';
            loginForm.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Formulário de cadastro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const phone = document.getElementById('reg-phone').value;

        // Simulação de cadastro
        if (name && email && password && phone) {
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
            registerForm.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Filtros
    categoryFilter.addEventListener('change', () => {
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        loadMenuItems(category, priceRange);
    });

    priceFilter.addEventListener('change', () => {
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        loadMenuItems(category, priceRange);
    });

    resetFilters.addEventListener('click', () => {
        categoryFilter.value = 'all';
        priceFilter.value = 'all';
        loadMenuItems();
    });

    // Controles do carousel
    document.querySelector('.carousel-control.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);

    // Redimensionamento da tela
    window.addEventListener('resize', updateCarousel);

    // Avaliações
    closeReviews.addEventListener('click', () => {
        reviewsModal.style.display = 'none';
    });

    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            selectedRating = rating;

            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    submitReview.addEventListener('click', () => {
        if (selectedRating === 0) {
            alert('Por favor, selecione uma avaliação com estrelas.');
            return;
        }

        const comment = reviewComment.value.trim();
        if (!comment) {
            alert('Por favor, escreva um comentário.');
            return;
        }

        // Simular adição de avaliação
        const item = menuItems.find(item => item.id === currentItemId);
        item.reviewsList = item.reviewsList || [];
        item.reviewsList.unshift({
            user: "Você",
            rating: selectedRating,
            comment: comment
        });

        // Atualizar média de avaliações
        const totalRatings = item.reviewsList.reduce((sum, review) => sum + review.rating, 0);
        item.rating = totalRatings / item.reviewsList.length;
        item.reviews = item.reviewsList.length;

        // Recarregar avaliações
        showReviews(currentItemId);
        loadMenuItems(categoryFilter.value, priceFilter.value);

        alert('Avaliação enviada com sucesso!');
    });
});