export function initContactLink() {
	const link = document.getElementById('contact-link');
	if (!link) return;
	const email = link.title.replace(/ at | małpa /g, '@');
	link.href = `mailto:${email}`;
	const first = link.title.split(' ')[0];
	link.title = first.charAt(0).toUpperCase() + first.slice(1);
}

initContactLink();
