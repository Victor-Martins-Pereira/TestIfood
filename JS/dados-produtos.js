/* ==================== DADOS E CONFIGURAÇÕES INICIAIS ==================== */
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

// Variáveis de estado
let currentItemId = null;
let selectedRating = 0;
let currentSlide = 0;

// Dados das categorias para o carousel
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