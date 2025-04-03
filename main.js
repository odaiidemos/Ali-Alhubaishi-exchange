// List of currencies with their rates
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

// Add debugging logs to verify the flow
console.log('Currencies array:', currencies);

// Load currencies from localStorage
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

// Load currencies from storage when the page loads
loadCurrenciesFromStorage();

// Populate currency dropdowns
const fromCurrencyDropdown = document.getElementById('from-currency');
const toCurrencyDropdown = document.getElementById('to-currency');

// Safely handle dropdowns and buttons only if they exist in the DOM
if (fromCurrencyDropdown && toCurrencyDropdown) {
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency.code;
        optionFrom.textContent = `${currency.name} (${currency.code})`;
        fromCurrencyDropdown.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency.code;
        optionTo.textContent = `${currency.name} (${currency.code})`;
        toCurrencyDropdown.appendChild(optionTo);
    });
} else {
    console.warn('Currency dropdown elements not found in the DOM.');
}

// Fix the issue where all users' balances are updated during currency exchange
const exchangeBtn = document.getElementById('exchange-btn');
if (exchangeBtn) {
    exchangeBtn.addEventListener('click', () => {
        const fromCurrency = fromCurrencyDropdown.value;
        const toCurrency = toCurrencyDropdown.value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (isNaN(amount) || amount <= 0) {
            document.getElementById('result').textContent = "Please enter a valid amount.";
            document.getElementById('result').style.color = 'red';
            return;
        }

        if (fromCurrency === toCurrency) {
            document.getElementById('result').textContent = "Please select different currencies.";
            document.getElementById('result').style.color = 'red';
            return;
        }

        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            document.getElementById('result').textContent = "User not logged in.";
            document.getElementById('result').style.color = 'red';
            return;
        }

        const fromRate = currencies.find(currency => currency.code === fromCurrency).rate;
        const toRate = currencies.find(currency => currency.code === toCurrency).rate;
        const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);

        // Check if the user has enough balance in the source currency
        if (!loggedInUser.balances[fromCurrency] || loggedInUser.balances[fromCurrency] < amount) {
            document.getElementById('result').textContent = `Insufficient balance in ${fromCurrency}.`;
            document.getElementById('result').style.color = 'red';
            return;
        }

        // Deduct the amount from the source currency
        loggedInUser.balances[fromCurrency] -= amount;

        // Add the converted amount to the target currency
        if (!loggedInUser.balances[toCurrency]) {
            loggedInUser.balances[toCurrency] = 0;
        }
        loggedInUser.balances[toCurrency] += parseFloat(convertedAmount);

        // Update the user data in sessionStorage and localStorage
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.email === loggedInUser.email);
        if (userIndex !== -1) {
            users[userIndex].balances = loggedInUser.balances; // Update only the balances of the logged-in user
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Update the displayed balances
        const balancesList = document.getElementById('balances-list');
        balancesList.innerHTML = '';
        for (const [currency, balance] of Object.entries(loggedInUser.balances)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${currency}: ${balance.toFixed(2)}`;
            balancesList.appendChild(listItem);
        }

        // Display success message
        document.getElementById('result').textContent = `Successfully exchanged ${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency}.`;
        document.getElementById('result').style.color = 'green';
    });
} else {
    console.warn('Exchange button not found in the DOM.');
}

document.addEventListener('DOMContentLoaded', () => {
    // Handle login
    const loginBtn = document.getElementById('login-btn');
    loginBtn?.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Hide the login section and display the user info section
            document.getElementById('auth-section').style.display = 'none';
            const userInfoSection = document.getElementById('user-info');
            userInfoSection.style.display = 'block';

            // Show the actions container (both cards)
            document.getElementById('actions-container').style.display = 'flex';

            // Populate user info
            document.getElementById('user-name').textContent = user.username;
            document.getElementById('user-email').textContent = user.email;
        } else {
            document.getElementById('login-error').textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
        }
    });

    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', () => {
        // Hide user info and actions container, show login section
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('actions-container').style.display = 'none';
        document.getElementById('auth-section').style.display = 'block';
    });

    // Handle signup
    const signupBtn = document.getElementById('signup-btn');
    signupBtn?.addEventListener('click', () => {
        const username = document.getElementById('new-username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('new-password').value;

        if (username && email && password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.username === username)) {
                document.getElementById('signup-success').textContent = "اسم المستخدم موجود بالفعل.";
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            document.getElementById('signup-success').textContent = "تم إنشاء الحساب بنجاح!";
            setTimeout(() => {
                document.getElementById('signup-success').textContent = "";
                document.getElementById('show-login').click();
            }, 2000);
        } else {
            document.getElementById('signup-success').textContent = "يرجى ملء جميع الحقول.";
        }
    });

    // Handle sticky navigation bar background transition
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Handle hamburger menu toggle
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const responsiveMenu = document.querySelector('nav.menu');

        if (menuToggle && responsiveMenu) {
            menuToggle.addEventListener('click', () => {
                responsiveMenu.classList.toggle('active');
            });

            // Close the menu when clicking outside of it
            document.addEventListener('click', (event) => {
                if (!responsiveMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    responsiveMenu.classList.remove('active');
                }
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Call the function to populate exchange rates on page load
    populateExchangeRates();
});

// Add signup functionality
const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-btn');
const signupSuccessMessage = document.getElementById('signup-success');

// Modify the signup logic to include account number and balances
signupButton.addEventListener('click', () => {
    const formData = new FormData(signupForm);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        signupSuccessMessage.textContent = 'Email already exists.';
        signupSuccessMessage.style.color = 'red';
        return;
    }

    // Generate a unique 10-digit account number
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    // Assign random balances for YER, SAR, and USD
    const balances = {
        YER: Math.floor(Math.random() * 100001),
        SAR: Math.floor(Math.random() * 100001),
        USD: Math.floor(Math.random() * 100001)
    };

    users.push({ username, email, password, accountNumber, balances });
    localStorage.setItem('users', JSON.stringify(users));

    signupSuccessMessage.textContent = 'Signup successful!';
    signupSuccessMessage.style.color = 'green';
    signupForm.reset();
});

// Add login functionality
const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-btn');
const loginErrorMessage = document.getElementById('login-error');

// Ensure unique balances are displayed and updated for each user
document.getElementById('login-btn').addEventListener('click', () => {
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        loginErrorMessage.textContent = 'Invalid email or password.';
        loginErrorMessage.style.color = 'red';
        return;
    }

    // Store only the logged-in user's data in sessionStorage
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));

    // Display user info
    document.getElementById('account-number').textContent = user.accountNumber;

    const balancesList = document.getElementById('balances-list');
    balancesList.innerHTML = '';
    for (const [currency, balance] of Object.entries(user.balances)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${currency}: ${balance.toFixed(2)}`;
        balancesList.appendChild(listItem);
    }

    // Hide login section and show user info section
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('actions-container').style.display = 'flex';
});

// Smooth UI transitions
const authSection = document.getElementById('auth-section');
const signupSection = document.getElementById('signup-section');
const loginSection = document.getElementById('login-section');

function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';
    let opacity = 0;
    const interval = setInterval(() => {
        opacity += 0.1;
        element.style.opacity = opacity;
        if (opacity >= 1) clearInterval(interval);
    }, 30);
}

function fadeOut(element) {
    let opacity = 1;
    const interval = setInterval(() => {
        opacity -= 0.1;
        element.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(interval);
            element.style.display = 'none';
        }
    }, 30);
}

const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');

showSignupLink.addEventListener('click', () => {
    fadeOut(loginSection);
    fadeIn(signupSection);
});

showLoginLink.addEventListener('click', () => {
    fadeOut(signupSection);
    fadeIn(loginSection);
});

// Handle money transfer
document.getElementById('transfer-btn').addEventListener('click', () => {
    const recipientUsername = document.getElementById('recipient-username').value.trim();
    const transferAmount = parseFloat(document.getElementById('transfer-amount').value);

    if (!recipientUsername || isNaN(transferAmount) || transferAmount <= 0) {
        document.getElementById('transfer-result').textContent = "يرجى إدخال اسم مستخدم صحيح ومبلغ صالح.";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const recipient = users.find(user => user.username === recipientUsername);

    if (!recipient) {
        document.getElementById('transfer-result').textContent = "المستخدم المستلم غير موجود.";
        return;
    }

    // Simulate successful transfer
    document.getElementById('transfer-result').textContent = `تم إرسال ${transferAmount} إلى ${recipientUsername} بنجاح!`;
    document.getElementById('transfer-result').style.color = 'green';

    // Clear the form
    document.getElementById('money-transfer-form').reset();
});

// Update balances only for the logged-in user during currency exchange
document.getElementById('exchange-btn').addEventListener('click', () => {
    const fromCurrency = fromCurrencyDropdown.value;
    const toCurrency = toCurrencyDropdown.value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').textContent = "Please enter a valid amount.";
        document.getElementById('result').style.color = 'red';
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById('result').textContent = "Please select different currencies.";
        document.getElementById('result').style.color = 'red';
        return;
    }

    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        document.getElementById('result').textContent = "User not logged in.";
        document.getElementById('result').style.color = 'red';
        return;
    }

    const fromRate = currencies.find(currency => currency.code === fromCurrency).rate;
    const toRate = currencies.find(currency => currency.code === toCurrency).rate;
    const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);

    // Check if the user has enough balance in the source currency
    if (!loggedInUser.balances[fromCurrency] || loggedInUser.balances[fromCurrency] < amount) {
        document.getElementById('result').textContent = `Insufficient balance in ${fromCurrency}.`;
        document.getElementById('result').style.color = 'red';
        return;
    }

    // Deduct the amount from the source currency
    loggedInUser.balances[fromCurrency] -= amount;

    // Add the converted amount to the target currency
    if (!loggedInUser.balances[toCurrency]) {
        loggedInUser.balances[toCurrency] = 0;
    }
    loggedInUser.balances[toCurrency] += parseFloat(convertedAmount);

    // Update the user data in sessionStorage and localStorage
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === loggedInUser.email);
    if (userIndex !== -1) {
        users[userIndex].balances = loggedInUser.balances; // Update only the balances of the logged-in user
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Update the displayed balances
    const balancesList = document.getElementById('balances-list');
    balancesList.innerHTML = '';
    for (const [currency, balance] of Object.entries(loggedInUser.balances)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${currency}: ${balance.toFixed(2)}`;
        balancesList.appendChild(listItem);
    }

    // Display success message
    document.getElementById('result').textContent = `Successfully exchanged ${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency}.`;
    document.getElementById('result').style.color = 'green';
});

// Function to populate exchange rates dynamically with a limit of 5 rows
function populateExchangeRates() {
    console.log('Populating exchange rates...');
    const tableBody = document.querySelector('#exchange-rates-table tbody');
    if (!tableBody) {
        console.error('Exchange rates table body not found!');
        return;
    }

    tableBody.innerHTML = ''; // Clear existing rows

    currencies.slice(0, 5).forEach(currency => { // Limit to 5 rows
        console.log('Adding currency:', currency);
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = currency.name;
        row.appendChild(nameCell);

        const codeCell = document.createElement('td');
        codeCell.textContent = currency.code;
        row.appendChild(codeCell);

        const rateCell = document.createElement('td');
        rateCell.textContent = currency.rate.toFixed(2);
        row.appendChild(rateCell);

        tableBody.appendChild(row);
    });
}

// Ensure the DOM is fully loaded before populating exchange rates
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded.');
    loadCurrenciesFromStorage(); // Ensure currencies are loaded from storage
    populateExchangeRates(); // Populate the exchange rates table
});

document.addEventListener('keydown', (event) => {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        const inputs = Array.from(document.querySelectorAll('input, textarea'));
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


