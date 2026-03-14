document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlistForm');
  const message = document.getElementById('formMessage');
  const emailInput = document.getElementById('emailInput');
    const submitButton = document.getElementById('joinButton');
    const year = document.getElementById('year');

    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    if (!form || !emailInput || !submitButton || !message) {
        return;
    }

    const apiUrl = 'https://fathm-backend-coming-soon--fatm-back-team.replit.app/api/waitlist';

    const setMessage = (text, kind = 'success') => {
        message.textContent = text;
        message.style.color = kind === 'success' ? '#4de2a4' : '#ff8ca8';
    };

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

        const email = emailInput.value.trim();

        if (!email || !emailInput.checkValidity()) {
            setMessage('Please enter a valid email address.', 'error');
            return;
        }

    submitButton.disabled = true;
        submitButton.textContent = 'Joining...';
        setMessage('');

    try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            let result = null;
            try {
                result = await response.json();
            } catch {
                result = null;
            }

            if (response.ok) {
                setMessage(result?.message || 'You’re on the list. Welcome to Fathm.');
                form.reset();
            } else {
                setMessage(
                    result?.message || 'Could not submit right now. Please try again shortly.',
                    'error'
                );
            }
    } catch (error) {
            console.error('Waitlist submission failed:', error);
            setMessage('Connection issue. You can also contact support@fathm.net.', 'error');
    } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Join waitlist';
    }
  });
});
