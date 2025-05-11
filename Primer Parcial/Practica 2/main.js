// main.js - Archivo principal de JavaScript
import './assets/css/style.css';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portafolio Dashboard cargado correctamente');
  
  // Ejemplo de funcionalidad para el formulario de contacto
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Capturar datos del formulario
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Aquí normalmente enviarías los datos a un backend
      console.log('Formulario enviado:', formValues);
      
      // Mostrar algún feedback al usuario
      alert('¡Gracias por tu mensaje! Te responderemos pronto.');
      contactForm.reset();
    });
  }
  
  // Ejemplo de animación para las barras de progreso de habilidades
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.bg-indigo-600');
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.width = width;
      }, 300);
    });
  };
  
  // Ejecutar animación de barras de habilidades
  animateSkillBars();
});