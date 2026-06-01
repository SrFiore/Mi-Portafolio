// Menú hamburguesa
document.querySelector('.menu-hamburguesa').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// ---------- SCROLL SUAVE CON OFFSET DINÁMICO Y FLAG ----------
let isScrollingToSection = false; // Flag para no ocultar el header durante scroll automático

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        // Mostrar el header inmediatamente (si estaba oculto)
        const header = document.querySelector('.navbar');
        header.style.transform = 'translateY(0)';

        // Calcular posición exacta del destino respecto al viewport
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = header.offsetHeight;
        const extraMargin = 2; // Espacio adicional entre header y sección
        const offsetPosition = rect.top + scrollTop - headerHeight - extraMargin;

        // Activar flag para que el header no se oculte durante el scroll suave
        isScrollingToSection = true;

        // Realizar scroll suave
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Desactivar la flag después de que el scroll termine (aprox 800ms)
        setTimeout(() => {
            isScrollingToSection = false;
        }, 800);
    });
});

// ---------- OCULTAR/MOSTRAR HEADER CON SCROLL (respetando la flag) ----------
let lastScrollTop = 0;
const header = document.querySelector('.navbar');
const scrollThreshold = 50;

window.addEventListener('scroll', function () {
    // Si estamos en medio de un scroll automático del menú, no ocultar el header
    if (isScrollingToSection) return;

    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // En el tope de la página, mostrar siempre
    if (currentScroll === 0) {
        header.style.transform = 'translateY(0)';
        lastScrollTop = currentScroll;
        return;
    }

    // Ocultar solo si bajamos más de 50px y la flag es false
    if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
        header.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScrollTop) {
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ---------- ANIMACIÓN DE CAMBIO DE COLOR Y PADDING DEL HEADER (opcional, conserva lo que ya tenías) ----------
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(7, 7, 16, 0.98)';
        navbar.style.padding = '15px 0';
    } else {
        navbar.style.backgroundColor = 'rgba(13, 13, 21, 0.95)';
        navbar.style.padding = '20px 0';
    }
});