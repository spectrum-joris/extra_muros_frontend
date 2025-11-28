// frontend/js/auth.js

// Helper om token op te slaan
function saveTokenToLocalStorage(token) {
    if (!token) return;
    localStorage.setItem('access_token', token);
  }
  
  // REGISTREREN
  async function handleRegister(event) {
    event.preventDefault();
  
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
  
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (!email || !password) {
      alert('Vul een e-mail en wachtwoord in.');
      return;
    }
  
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error || 'Registreren mislukt');
        return;
      }
  
      if (data.access_token) {
        saveTokenToLocalStorage(data.access_token);
        alert('Account aangemaakt en ingelogd!');
        window.location.href = '/createJourney.html';
      } else if (data.needs_email_confirmation) {
        alert(
          'Account aangemaakt. Check je e-mail om je account te bevestigen voordat je kan inloggen.'
        );
        window.location.href = '/register.html';
      } else {
        alert('Account aangemaakt.');
        window.location.href = '/register.html';
      }
    } catch (err) {
      console.error(err);
      alert('Er ging iets mis bij het registreren.');
    }
  }
  
  // INLOGGEN
  async function handleLogin(event) {
    event.preventDefault();
  
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
  
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (!email || !password) {
      alert('Vul een e-mail en wachtwoord in.');
      return;
    }
  
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error || 'Inloggen mislukt');
        return;
      }
  
      saveTokenToLocalStorage(data.access_token);
      alert('Succesvol ingelogd!');
      window.location.href = '/createJourney.html';
    } catch (err) {
      console.error(err);
      alert('Er ging iets mis bij het inloggen.');
    }
  }
  
  // Oude dev-functie om manueel een token te plakken (optioneel)
  function saveToken() {
    const token = document.getElementById('tokenInput')?.value;
    if (token) {
      localStorage.setItem('access_token', token);
      alert('Token opgeslagen in localStorage (dev).');
    }
  }
  
  // Event listeners koppelen
  document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', handleRegister);
    }
  
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
    }
  });
  