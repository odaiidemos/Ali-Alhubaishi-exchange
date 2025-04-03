// Ensure the currencies array is accessible
const currencies = [
    { name: "الريال اليمني", code: "YER", rate: 250.00 },
    { name: "الدولار الأمريكي", code: "USD", rate: 1.00 },
    { name: "اليورو", code: "EUR", rate: 0.85 },
    { name: "الجنيه البريطاني", code: "GBP", rate: 0.75 },
    { name: "ويسترن يونيون", code: "WU", rate: 1.00 },
    { name: "الريال السعودي", code: "SAR", rate: 3.75 },
    { name: "الدرهم الإماراتي", code: "AED", rate: 3.67 },
    { name: "الريال العماني", code: "OMR", rate: 0.39 },
    { name: "الدينار الأردني", code: "JOD", rate: 0.71 },
    { name: "الجنيه المصري", code: "EGP", rate: 30.00 },
    { name: "الدينار العراقي", code: "IQD", rate: 1300.00 },
    { name: "الدينار الجزائري", code: "DZD", rate: 135.00 },
    { name: "الدينار البحريني", code: "BHD", rate: 0.38 },
    { name: "الدينار الكويتي", code: "KWD", rate: 0.31 },
    { name: "الليرة اللبنانية", code: "LBP", rate: 15000.00 },
    { name: "الريال القطري", code: "QAR", rate: 3.64 },
    { name: "الليرة السورية", code: "SYP", rate: 13000.00 },
    { name: "الجنيه السوداني", code: "SDG", rate: 600.00 },
    { name: "الدينار التونسي", code: "TND", rate: 3.10 },
    { name: "الشيكل الفلسطيني", code: "ILS", rate: 3.60 },
    { name: "الفرنك الجيبوتي", code: "DJF", rate: 177.00 },
    { name: "الفرنك القمري", code: "KMF", rate: 460.00 },
    { name: "الدينار الليبي", code: "LYD", rate: 4.90 },
    { name: "الدرهم المغربي", code: "MAD", rate: 10.00 },
    { name: "الأوقية الموريتانية", code: "MRU", rate: 40.00 },
    { name: "الشلن الصومالي", code: "SOS", rate: 570.00 },
    { name: "الدولار الأسترالي", code: "AUD", rate: 1.30 },
    { name: "الين الياباني", code: "JPY", rate: 150.00 },
    { name: "الفرنك السويسري", code: "CHF", rate: 0.90 },
    { name: "الدولار الكندي", code: "CAD", rate: 1.35 },
    { name: "اليوان الصيني", code: "CNY", rate: 7.10 },
    { name: "الروبل الروسي", code: "RUB", rate: 93.00 },
    { name: "البيزو المكسيكي", code: "MXN", rate: 17.00 },
    { name: "الريال البرازيلي", code: "BRL", rate: 5.00 },
    { name: "البيزو التشيلي", code: "CLP", rate: 880.00 },
    { name: "الروبية الهندية", code: "INR", rate: 83.00 },
    { name: "دولار هونغ كونغ", code: "HKD", rate: 7.80 },
    { name: "الكرونا السويدية", code: "SEK", rate: 10.50 },
    { name: "الوون الكوري الجنوبي", code: "KRW", rate: 1300.00 },
    { name: "الدولار السنغافوري", code: "SGD", rate: 1.35 },
    { name: "الكرونة النرويجية", code: "NOK", rate: 10.20 },
    { name: "الراند الجنوب أفريقي", code: "ZAR", rate: 19.00 },
    { name: "الليرة التركية", code: "TRY", rate: 30.00 }
];

// Add animation for statistics after login
function animateNumber(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const increment = range / (duration / 10);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 10);
}

// Handle admin login
document.getElementById('admin-login-btn').addEventListener('click', () => {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === 'abood' && password === 'abood') {
        const loginSection = document.querySelector('.card');
        loginSection.style.display = 'none'; // Hide the entire section
        const dashboard = document.getElementById('admin-dashboard');
        dashboard.style.display = 'block';

        // Populate dashboard content
        populateAnalytics();
        populateTopCurrencies();
        populateRecentTransactions();
        populateCurrencyTable();
        initializeRevenueChart();

        // Trigger animations for statistics
        animateNumber('total-transactions', 0, 1234, 2000);
        animateNumber('total-revenue', 0, 12345, 2000);
        animateNumber('total-users', 0, 567, 2000);
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('admin-login-form').addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT') {
        const inputs = Array.from(document.querySelectorAll('#admin-login-form input'));
        const currentIndex = inputs.indexOf(activeElement);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % inputs.length;
            inputs[nextIndex].focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const prevIndex = (currentIndex - 1 + inputs.length) % inputs.length;
            inputs[prevIndex].focus();
        }
    }
});

// Handle updating exchange rates
document.getElementById('update-rates-btn').addEventListener('click', () => {
    const usdToEur = parseFloat(document.getElementById('usd-eur').value);
    const usdToGbp = parseFloat(document.getElementById('usd-gbp').value);

    if (isNaN(usdToEur) || isNaN(usdToGbp) || usdToEur <= 0 || usdToGbp <= 0) {
        alert("Please enter valid exchange rates.");
        return;
    }

    exchangeRates.USD.EUR = usdToEur;
    exchangeRates.USD.GBP = usdToGbp;
    exchangeRates.EUR.USD = (1 / usdToEur).toFixed(2);
    exchangeRates.GBP.USD = (1 / usdToGbp).toFixed(2);

    alert("Exchange rates updated successfully!");
});

// Populate the currency table in the admin dashboard
function populateCurrencyTable() {
    const tableBody = document.getElementById('currency-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    currencies.forEach(currency => {
        const row = document.createElement('tr');

        // Currency name
        const nameCell = document.createElement('td');
        nameCell.textContent = currency.name;
        row.appendChild(nameCell);

        // Currency code
        const codeCell = document.createElement('td');
        codeCell.textContent = currency.code;
        row.appendChild(codeCell);

        // Current rate
        const rateCell = document.createElement('td');
        rateCell.textContent = currency.rate.toFixed(2);
        row.appendChild(rateCell);

        // Update rate input
        const updateCell = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        input.step = '0.01';
        input.value = currency.rate.toFixed(2);
        input.dataset.code = currency.code; // Store currency code for reference
        updateCell.appendChild(input);
        row.appendChild(updateCell);

        tableBody.appendChild(row);
    });
}

// Save changes to currency rates
function saveChanges() {
    const inputs = document.querySelectorAll('#currency-table-body input');
    inputs.forEach(input => {
        const code = input.dataset.code;
        const newRate = parseFloat(input.value);

        if (!isNaN(newRate) && newRate > 0) {
            const currency = currencies.find(c => c.code === code);
            if (currency) {
                currency.rate = newRate;
            }
        }
    });

    // Save updated currencies to localStorage
    localStorage.setItem('currencies', JSON.stringify(currencies));

    alert('Currency rates updated successfully!');
    populateCurrencyTable(); // Refresh the table with updated rates
}

// Load currencies from localStorage on page load
function loadCurrenciesFromStorage() {
    const storedCurrencies = localStorage.getItem('currencies');
    if (storedCurrencies) {
        const parsedCurrencies = JSON.parse(storedCurrencies);
        parsedCurrencies.forEach(updatedCurrency => {
            const currency = currencies.find(c => c.code === updatedCurrency.code);
            if (currency) {
                currency.rate = updatedCurrency.rate;
            }
        });
    }
}

// Load currencies from storage when the admin page loads
loadCurrenciesFromStorage();

// Populate demo analytics data
function populateAnalytics() {
    document.getElementById('total-transactions').textContent = '1,234';
    document.getElementById('total-revenue').textContent = '$12,345.67';
    document.getElementById('total-users').textContent = '567';
}

// Populate top performing currencies
function populateTopCurrencies() {
    const topCurrencies = [
        { name: "الدولار الأمريكي", code: "USD", performance: "+5%" },
        { name: "اليورو", code: "EUR", performance: "+3%" },
        { name: "الجنيه البريطاني", code: "GBP", performance: "+2%" }
    ];

    const list = document.getElementById('top-currencies-list');
    list.innerHTML = ''; // Clear existing items

    topCurrencies.forEach(currency => {
        const listItem = document.createElement('li');
        listItem.textContent = `${currency.name} (${currency.code}) - ${currency.performance}`;
        list.appendChild(listItem);
    });
}

// Populate recent transactions
function populateRecentTransactions() {
    const recentTransactions = [
        { date: "2023-10-01", currency: "USD", amount: "1000", user: "User1" },
        { date: "2023-10-02", currency: "EUR", amount: "500", user: "User2" },
        { date: "2023-10-03", currency: "GBP", amount: "750", user: "User3" }
    ];

    const tableBody = document.getElementById('recent-transactions-body');
    tableBody.innerHTML = ''; // Clear existing rows

    recentTransactions.forEach(transaction => {
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = transaction.date;
        row.appendChild(dateCell);

        const currencyCell = document.createElement('td');
        currencyCell.textContent = transaction.currency;
        row.appendChild(currencyCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = transaction.amount;
        row.appendChild(amountCell);

        const userCell = document.createElement('td');
        userCell.textContent = transaction.user;
        row.appendChild(userCell);

        tableBody.appendChild(row);
    });
}

// Initialize the revenue chart with a delay for animation alignment
function initializeRevenueChart() {
    setTimeout(() => {
        const ctx = document.getElementById('revenueChart').getContext('2d');
        const revenueChart = new Chart(ctx, {
            type: 'line', // Line chart
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'], // Months
                datasets: [{
                    label: 'الإيرادات ($)',
                    data: [1200, 1900, 3000, 5000, 2500, 4000], // Demo revenue data
                    backgroundColor: 'rgba(66, 165, 245, 0.2)', // Light blue fill
                    borderColor: 'rgba(66, 165, 245, 1)', // Blue border
                    borderWidth: 2,
                    tension: 0.4 // Smooth curve
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'الشهور'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'الإيرادات ($)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }, 600); // Delay to align with card animation
}

// Navigate between input fields using arrow keys
document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    const adminLoginForm = document.getElementById('admin-login-form');

    if (adminLoginForm && adminLoginForm.contains(activeElement) && activeElement.tagName === 'INPUT') {
        const inputs = Array.from(adminLoginForm.querySelectorAll('input'));
        const currentIndex = inputs.indexOf(activeElement);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % inputs.length;
            inputs[nextIndex].focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const prevIndex = (currentIndex - 1 + inputs.length) % inputs.length;
            inputs[prevIndex].focus();
        }
    }
});
