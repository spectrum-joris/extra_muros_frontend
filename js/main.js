// frontend/js/main.js
// main.js - fetch and show trips
async function getToken() {
    return localStorage.getItem('access_token');
  }
  
  async function fetchTrips() {
    const token = await getToken();
    const res = await fetch('/api/trips', {
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    });
    if (!res.ok) {
      console.error('Failed to fetch trips', await res.text());
      return;
    }
    const trips = await res.json();
    console.log('Trips:', trips);
  
    const list = document.getElementById('tripsList');
    if (!list) return;
    list.innerHTML = '';
    trips.forEach((t) => {
      const li = document.createElement('li');
      li.textContent = t.title || 'Trip ' + t.id;
      list.appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refreshTrips');
    if (refreshBtn) refreshBtn.addEventListener('click', fetchTrips);
    fetchTrips();
  });
  