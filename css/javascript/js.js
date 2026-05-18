document.addEventListener('DOMContentLoaded', () => {
	// Alur sederhana: kirim data lewat query string, lalu halaman tampil membacanya.
	const form = document.getElementById('profilForm');
	const result = document.getElementById('profilResult');

	if (form) {
		// Jika di profil.html: cegah submit default lalu redirect sambil membawa data di URL.
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const params = new URLSearchParams({
				nim: form.nim.value.trim(),
				nama: form.nama.value.trim(),
				alamat: form.alamat.value.trim(),
				hobi: form.hobi.value.trim(),
				instagram: form.instagram.value.trim(),
			});

			window.location.href = `profil-tampil.html?${params.toString()}`;
		});
	}

	if (result) {
		// Jika di profil-tampil.html: baca query string dan tampilkan nilai.
		const params = new URLSearchParams(window.location.search);

		if (!params.toString()) {
			return;
		}

		const sanitize = (text) => {
			// Hindari karakter yang bisa memecah HTML.
			return (text || '-')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
		};

		result.innerHTML = `
			<ul>
				<li><strong>NIM:</strong> ${sanitize(params.get('nim'))}</li>
				<li><strong>Nama:</strong> ${sanitize(params.get('nama'))}</li>
				<li><strong>Alamat:</strong> ${sanitize(params.get('alamat'))}</li>
				<li><strong>Hobi:</strong> ${sanitize(params.get('hobi'))}</li>
				<li><strong>Instagram:</strong> ${sanitize(params.get('instagram'))}</li>
			</ul>
		`;
	}
});

// Slider
let currentSlide = 0;

function goToSlide(n) {
    const container = document.getElementById('sliderContainer');
    if (container) {
        currentSlide = Math.max(0, Math.min(2, n));
        container.style.transform = `translateX(-${currentSlide * 33.33}%)`;
        document.querySelectorAll('.slider-dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentSlide);
        });
    }
}