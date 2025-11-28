// frontend/js/createJourney.js
// createJourney.js - create a trip
async function createTrip() {
    const titleInput = document.getElementById('tripTitle');
    const title = titleInput.value.trim();
  
    if (!title) {
      alert('Geef je reis een naam.');
      return;
    }
  
    const token = localStorage.getItem('access_token');
    const res = await fetch('/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify({ title }),
    });
  
    if (!res.ok) {
      alert('Failed to create trip: ' + (await res.text()));
      return;
    }
  
    alert('Trip created');
    // optioneel: popup tonen in plaats van redirect
    window.location.href = '/createJourney.html';
  }
  