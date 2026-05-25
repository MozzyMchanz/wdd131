const reviewProducts = [
  { id: 'athena-thermostat', name: 'Athena Smart Thermostat' },
  { id: 'zephyr-air-purifier', name: 'Zephyr Air Purifier' },
  { id: 'solis-water-heater', name: 'Solis Water Heater' },
  { id: 'nova-light-system', name: 'Nova Light System' },
  { id: 'orion-security-kit', name: 'Orion Security Kit' }
];

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

  const isSubmitted = productId && ratingValue && installationDate;

  if (!isSubmitted) {
    confirmationMessage.textContent = 'No review data was submitted. Please return to the form and submit your review.';
    productDisplay.textContent = 'N/A';
    ratingDisplay.textContent = 'N/A';
    dateDisplay.textContent = 'N/A';
    reviewTextDisplay.textContent = 'No review submitted.';
    userNameDisplay.textContent = 'Anonymous';
    featuresDisplay.innerHTML = '<li>No features selected.</li>';
  } else {
    const matchedProduct = reviewProducts.find(item => item.id === productId);
    productDisplay.textContent = matchedProduct ? matchedProduct.name : productId;
    ratingDisplay.textContent = '★'.repeat(Number(ratingValue)) + '☆'.repeat(5 - Number(ratingValue));
    dateDisplay.textContent = installationDate;
    reviewTextDisplay.textContent = reviewText ? reviewText : 'No written review provided.';
    userNameDisplay.textContent = userName ? userName : 'Anonymous';
    featuresDisplay.innerHTML = features.length
      ? features.map(feature => `<li>${feature}</li>`).join('')
      : '<li>No features selected.</li>';

    const storedCount = Number(localStorage.getItem('reviewCount') || '0');
    const updatedCount = storedCount + 1;
    localStorage.setItem('reviewCount', String(updatedCount));
    reviewCountText.textContent = String(updatedCount);
  }

  if (!isSubmitted) {
    reviewCountText.textContent = String(Number(localStorage.getItem('reviewCount') || '0'));
  }
});
