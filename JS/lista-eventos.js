/* ==================== EVENT LISTENERS ==================== */
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

    // Login e Cadastro
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

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

    // Formulários
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