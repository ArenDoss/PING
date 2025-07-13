const API_URL = 'http://127.0.0.1:5000';

// Triggered when user clicks the big "PING" button
document.querySelector('.ping-image-button').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const room = document.getElementById('room').value;
  const course = document.getElementById('course').value;
  const description = document.getElementById('description').value;

  if (!room || !course || course === 'N/A') {
    alert('Please enter a valid Room and select a Course.');
    return;
  }

  fetch(`${API_URL}/ping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      room,
      subject: course,
      description
    })
  })
  .then(res => res.json())
  .then(() => {
    fetchPings();    // Refresh the ping list
    clearForm();     // Optional: clear form after submit
  });
});

let lastPingTimestamps = new Set();

// Fetches all pings from backend and shows them
function fetchPings() {
  fetch(`${API_URL}/pings`)
    .then(res => res.json())
    .then(data => {
      const area = document.querySelector('.info-area');
      area.innerHTML = '';

      const newTimestamps = new Set();

      for (const p of data) {
        const isNew = !lastPingTimestamps.has(p.timestamp);
        newTimestamps.add(p.timestamp);

        const box = document.createElement('div');
        box.className = 'info-box' + (isNew ? ' new' : '');
        box.innerHTML = `<strong>${p.name}</strong> - ${p.subject} - Room ${p.room}<br>${p.description}`;
        area.appendChild(box);

        if (isNew) {
          setTimeout(() => box.classList.remove('new'), 300);
        }
      }

      // Update the last seen timestamps
      lastPingTimestamps = newTimestamps;
    });
}

// Clears all inputs after submitting
function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('room').value = '';
  document.getElementById('course').value = 'N/A';
  document.getElementById('description').value = '';
}

// Auto-refresh pings every 5 seconds
setInterval(fetchPings, 5000);
window.onload = fetchPings;