/* ==================== FUNÇÕES DE AVALIAÇÕES ==================== */
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
