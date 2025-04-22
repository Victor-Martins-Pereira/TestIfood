/* ==================== FUNÇÕES DO CARDÁPIO ==================== */
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