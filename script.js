/**
 * Pan Kurka - Skrypt obsługujący interakcje na stronie
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. OBSŁUGA MENU MOBILNEGO ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = !mobileMenu.classList.contains('hidden');
            
            if (isExpanded) {
                // Zamykanie menu
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            } else {
                // Otwieranie menu
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
            }
            
            // Odświeżenie ikon Lucide po zmianie HTML przycisku
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });

        // Zamykanie menu po kliknięciu w dowolny link (płynne przejście do sekcji)
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                if (window.lucide) window.lucide.createIcons();
            });
        });
    }

    // --- 2. DYNAMIKA NAWIGACJI PODCZAS SCROLLOWANIA ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Styl po przewinięciu: dodajemy cień i pełne tło
            navbar.classList.add('shadow-lg', 'bg-white/100');
            navbar.classList.remove('bg-cream/95', 'backdrop-blur-sm');
        } else {
            // Styl początkowy: lekka przezroczystość
            navbar.classList.remove('shadow-lg', 'bg-white/100');
            navbar.classList.add('bg-cream/95', 'backdrop-blur-sm');
        }
    });

    // --- 3. PŁYNNE PRZEWIJANIE (SMOOTH SCROLL) ---
    // Obsługuje wszystkie linki zaczynające się od #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Ignoruj puste linki #
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Obliczanie pozycji z uwzględnieniem wysokości fixed navbaru (80px)
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. INICJALIZACJA IKON ---
    if (window.lucide) {
        window.lucide.createIcons();
    }
});