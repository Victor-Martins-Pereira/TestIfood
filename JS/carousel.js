/* ==================== FUNÇÕES DO CAROUSEL ==================== */
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

function updateCarousel() {
    const itemWidth = document.querySelector('.category-item').offsetWidth;
    const gap = 15;
    const offset = currentSlide * (itemWidth + gap);
    carouselTrack.style.transform = `translateX(-${offset}px)`;
}

function nextSlide() {
    const totalItems = categoryItems.length;
    const visibleItems = Math.floor(carouselTrack.offsetWidth / (document.querySelector('.category-item').offsetWidth + 15));

    if (currentSlide < totalItems - visibleItems) {
        currentSlide++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}