document.addEventListener('DOMContentLoaded', () => {
  const productSelect = document.getElementById('productName');
  const products = window.productCatalog ?? [];

  if (!productSelect) {
    return;
  }

  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
});
