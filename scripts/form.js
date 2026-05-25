const products = [
  { id: 'athena-thermostat', name: 'Athena Smart Thermostat' },
  { id: 'zephyr-air-purifier', name: 'Zephyr Air Purifier' },
  { id: 'solis-water-heater', name: 'Solis Water Heater' },
  { id: 'nova-light-system', name: 'Nova Light System' },
  { id: 'orion-security-kit', name: 'Orion Security Kit' }
];

document.addEventListener('DOMContentLoaded', () => {
  const productSelect = document.getElementById('productName');

  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
});
