// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('.theme-icon');

const currentLang = html.getAttribute('lang') || 'en';

// Set initial theme based on system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const currentTheme = savedTheme || 'auto';

applyTheme(currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', (e) => {
	e.preventDefault();
	const currentTheme = html.getAttribute('data-theme');
	let newTheme;

	if (currentTheme === 'light') {
		newTheme = 'dark';
	} else if (currentTheme === 'dark') {
		newTheme = 'auto';
	} else {
		newTheme = 'light';
	}

	applyTheme(newTheme);
	localStorage.setItem('theme', newTheme);
	updateThemeIcon(newTheme);
});

function applyTheme(theme) {
	if (theme === 'auto') {
		html.removeAttribute('data-theme');
	} else {
		html.setAttribute('data-theme', theme);
	}
}

function updateThemeIcon(theme) {
	let iconType;

	if (theme === 'dark') {
		iconType = 'moon';
	} else if (theme === 'light') {
		iconType = 'sun';
	} else {
		// Auto - show based on system preference
		iconType = prefersDark ? 'moon' : 'sun';
	}

	// Replace the Feather icon
	const svg = feather.icons[iconType].toSvg();
	themeIcon.innerHTML = svg;

	// Update tooltip based on theme and language
	let tooltipText;
	if (theme === 'dark') {
		tooltipText = currentLang === 'pl' ? 'Tryb ciemny' : 'Dark mode';
	} else if (theme === 'light') {
		tooltipText = currentLang === 'pl' ? 'Tryb jasny' : 'Light mode';
	} else {
		tooltipText = currentLang === 'pl' ? 'Tryb automatyczny' : 'Automatic mode';
	}
	themeToggle.setAttribute('title', tooltipText);
}

// Scroll hide/show functionality
let lastScrollY = window.scrollY;
let ticking = false;
const topBar = document.getElementById('topBar');

function updateTopBar() {
	const scrollY = window.scrollY;

	if (scrollY > lastScrollY && scrollY > 100) {
		// Scrolling down
		topBar.classList.add('hidden');
	} else {
		// Scrolling up
		topBar.classList.remove('hidden');
	}

	lastScrollY = scrollY;
	ticking = false;
}

window.addEventListener('scroll', () => {
	if (!ticking) {
		window.requestAnimationFrame(updateTopBar);
		ticking = true;
	}
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
	if (localStorage.getItem('theme') !== 'light' && localStorage.getItem('theme') !== 'dark') {
		prefersDark = e.matches;
		updateThemeIcon('auto');
	}
});
