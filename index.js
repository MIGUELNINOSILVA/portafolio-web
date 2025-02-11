// Animación de scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar el título de servicios
const servicesTitle = document.querySelector('.services-title');
observer.observe(servicesTitle);

// Observar las tarjetas de servicios
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => observer.observe(card));

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Observar elementos adicionales
document.querySelectorAll('.portfolio-item').forEach(item => observer.observe(item));
document.querySelectorAll('.skill-icon').forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'translateY(-5px)';
    });
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'translateY(0)';
    });
});

// Manejar envío del formulario
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
});

document.querySelector('.hamburger').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Enviar al gmail
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Endpoint de Formspree
    const endpoint = 'https://formspree.io/f/xkgovnav';

    // Datos del formulario
    const formData = new FormData(form);

    // Envía los datos usando Fetch API
    fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Muestra el mensaje de éxito
            form.reset();
            successMessage.style.display = 'block';
        } else {
            throw new Error('Hubo un problema al enviar el formulario.');
        }
    })
    .catch(error => {
        alert('Ocurrió un error: ' + error.message);
    });
});