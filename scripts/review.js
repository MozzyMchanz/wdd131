document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('productName');
  const ratingValue = params.get('rating');
  const installationDate = params.get('installationDate');
  const reviewText = params.get('reviewText');
  const userName = params.get('userName');
  const features = params.getAll('features');

  const productDisplay = document.getElementById('productDisplay');
  const ratingDisplay = document.getElementById('ratingDisplay');
  const dateDisplay = document.getElementById('dateDisplay');
  const reviewTextDisplay = document.getElementById('reviewTextDisplay');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const featuresDisplay = document.getElementById('featuresDisplay');
  const confirmationMessage = document.getElementById('confirmationMessage');
  const reviewCountText = document.getElementById('reviewCountText');

  const ratingNumber = Number(ratingValue);
  const ratingValid = Number.isInteger(ratingNumber) && ratingNumber >= 1 && ratingNumber <= 5;
  const isSubmitted = Boolean(productId && ratingValid && installationDate);

  const productCatalog = window.productCatalog ?? [];
  const matchedProduct = productCatalog.find(item => item.id === productId);

  if (!isSubmitted) {
    confirmationMessage.textContent = 'No review data was submitted. Please return to the form and submit your review.';
  }

  productDisplay.textContent = matchedProduct ? matchedProduct.name : (productId || 'N/A');
  ratingDisplay.textContent = ratingValid
    ? '★'.repeat(ratingNumber) + '☆'.repeat(5 - ratingNumber)
    : 'N/A';
  dateDisplay.textContent = installationDate || 'N/A';
  reviewTextDisplay.textContent = reviewText ? reviewText : 'No written review provided.';
  userNameDisplay.textContent = userName ? userName : 'Anonymous';

  while (featuresDisplay.firstChild) {
    featuresDisplay.removeChild(featuresDisplay.firstChild);
  }

  if (features.length) {
    features.forEach(feature => {
      const listItem = document.createElement('li');
      listItem.textContent = feature;
      featuresDisplay.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement('li');
    listItem.textContent = 'No features selected.';
    featuresDisplay.appendChild(listItem);
  }

  const storedCount = Number(localStorage.getItem('reviewCount') || '0');
  const updatedCount = isSubmitted ? storedCount + 1 : storedCount;

  if (isSubmitted) {
    localStorage.setItem('reviewCount', String(updatedCount));
  }

  reviewCountText.textContent = String(updatedCount);
});
