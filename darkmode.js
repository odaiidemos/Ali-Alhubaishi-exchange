// Ensure dark mode toggle applies to all elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
const currentMode = localStorage.getItem('darkMode');

// Add transition animation for dark mode toggle
document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";

if (currentMode === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('darkMode', 'enabled');

    // Apply dark mode styles to all elements
    document.querySelectorAll('*').forEach(element => {
        element.classList.add('dark-mode');
    });
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', 'disabled');

    // Remove dark mode styles from all elements
    document.querySelectorAll('*').forEach(element => {
        element.classList.remove('dark-mode');
    });
}