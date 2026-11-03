const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  observer.observe(el);
});



const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const status = document.querySelector('#contact-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const submitLabel = contactForm.querySelector('.submit-label');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = 'Küldés folyamatban…';
    submitButton.disabled = true;
    submitLabel.textContent = 'Küldés…';

    try {
      const response = await fetch('https://formsubmit.co/ajax/mrtonmadarsz@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      });
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error('Az üzenetet most nem sikerült elküldeni.');
      }

      status.textContent = 'Köszönöm, az üzenet elküldése sikerült! Első használatkor erősítsd meg az aktiváló e-mailt.';
      contactForm.reset();
    } catch (error) {
      status.textContent = error.message || 'Hiba történt. Próbáld újra, vagy írj e-mailt.';
    } finally {
      submitButton.disabled = false;
      submitLabel.textContent = 'Üzenet küldése';
    }
  });
}
