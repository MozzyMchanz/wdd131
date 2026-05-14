function calculateWindChill(temperature, windSpeed) {
  return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}

document.addEventListener('DOMContentLoaded', () => {
  const temperature = 10;
  const windSpeed = 12;
  const windChillElement = document.getElementById('wind-chill');
  const currentYearElement = document.getElementById('current-year');
  const lastModifiedElement = document.getElementById('last-modified');

  if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${windChill.toFixed(1)}°C`;
  } else {
    windChillElement.textContent = 'N/A';
  }

  currentYearElement.textContent = new Date().getFullYear();
  lastModifiedElement.textContent = document.lastModified;
});
