// Tipos de cambio base
const baseExchangeRates = {
    XAF: 1,
    USD: 0.0016,
    RUB: 0.15125, // 100,000 XAF = 15,125 RUB
    EUR: 0.0015,
    ZMW: 0.0473,
    BRL: 0.0095,
    CUP: 0.0394,
    DOP: 0.1012
};

// Tipos de cambio cuando el contador llega a 0
const expiredExchangeRates = {
    ...baseExchangeRates,
    RUB: 0.15219 // 100,000 XAF = 15,219 RUB
};

// Elementos del DOM
const amountInput = document.getElementById('amount');
const baseCurrencySelect = document.getElementById('baseCurrency');
const countdownElement = document.getElementById('countdown');
const currenciesContainer = document.querySelector('.currencies');

// Función para convertir la cantidad
function convertAmount() {
    const amount = parseFloat(amountInput.value) || 0;
    const baseCurrency = baseCurrencySelect.value;
    const rates = countdown === 0 ? expiredExchangeRates : baseExchangeRates; // Usar tasas según el contador
    const baseRate = rates[baseCurrency];

    currenciesContainer.innerHTML = ''; // Limpiar contenedor de monedas

    Object.keys(rates).forEach(currency => {
        if (currency !== baseCurrency) {
            const convertedAmount = (amount * rates[currency] / baseRate).toLocaleString('es-ES', { minimumFractionDigits: 2 });
            const currencyElement = document.createElement('div');
            currencyElement.classList.add('currency');
            currencyElement.innerHTML = `
                <label>${currency}</label>
                <span>${getCurrencySymbol(currency)} ${convertedAmount}</span>
                <small>1 ${baseCurrency} = ${(rates[currency] / baseRate).toFixed(4)} ${currency}</small>
            `;
            currenciesContainer.appendChild(currencyElement);
        }
    });
}

// Función para obtener el símbolo de la moneda
function getCurrencySymbol(currency) {
    const symbols = {
        XAF: 'FCFA',
        USD: '$',
        RUB: '₽',
        EUR: '€',
        ZMW: 'ZK',
        BRL: 'R$',
        CUP: 'P',
        DOP: 'RD$'
    };
    return symbols[currency] || currency;
}

// Contador de 60 segundos
let countdown = 60;
function updateCountdown() {
    countdownElement.textContent = countdown;
    if (countdown > 0) {
        countdown--;
    } else {
        countdown = 60; // Reiniciar el contador
    }
    convertAmount(); // Actualizar conversión cuando el contador cambia
}

// Actualizar la conversión cuando cambia la cantidad o la moneda base
amountInput.addEventListener('input', convertAmount);
baseCurrencySelect.addEventListener('change', convertAmount);

// Inicializar
convertAmount();
setInterval(updateCountdown, 1000);