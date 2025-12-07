const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  db.collection('users').doc(user.uid).get()
    .then(doc => {
      if (!doc.exists || doc.data().role !== 'admin') {
        alert('Access denied. Admins only.');
        window.location.href = 'josh game store.html';
        return;
      }
      // If admin — load game list
      loadGames();
    })
    .catch(err => {
      console.error(err);
      alert('Error verifying admin privileges.');
      window.location.href = 'josh game store.html';
    });
});

function loadGames() {
  db.collection('gamesCatalog').get()
    .then(snapshot => {
      const list = document.getElementById('gameList');
      list.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.className = 'game-item';
        li.innerHTML = `
          <div class="game-info">
            <h3>${data.name} (${data.gameId})</h3>
            <p>${data.description}</p>
            <p>Price: ${data.price}</p>
            <p>Thumbnail URL: ${data.thumbnail || '—'}</p>
          </div>
          <div class="game-actions">
            <button class="btn-edit" onclick="showEditForm('${doc.id}')">Edit</button>
            <button class="btn-delete" onclick="deleteGame('${doc.id}')">Delete</button>
          </div>
          <div class="edit-form" id="form-${doc.id}">
            <input type="text" id="name-${doc.id}" value="${data.name}" placeholder="Game Name" required />
            <textarea id="desc-${doc.id}" rows="3">${data.description}</textarea>
            <input type="text" id="price-${doc.id}" value="${data.price}" placeholder="Price" required />
            <input type="text" id="thumb-${doc.id}" value="${data.thumbnail || ''}" placeholder="Thumbnail URL" />
            <button onclick="updateGame('${doc.id}')">Save Changes</button>
          </div>
        `;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById('message').innerText = 'Error loading games.';
    });
}

function showEditForm(id) {
  const form = document.getElementById(`form-${id}`);
  form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
}

function updateGame(id) {
  const name = document.getElementById(`name-${id}`).value.trim();
  const desc = document.getElementById(`desc-${id}`).value.trim();
  const priceRaw = document.getElementById(`price-${id}`).value.trim();
  const thumb = document.getElementById(`thumb-${id}`).value.trim();
  const price = parseFloat(priceRaw);
  if (!name || priceRaw === '' || isNaN(price)) {
    alert('Name and price are required, price must be a number.');
    return;
  }
  db.collection('gamesCatalog').doc(id).update({
    name: name,
    description: desc,
    price: price,
    thumbnail: thumb
  }).then(() => {
    alert('Game updated.');
    loadGames();
  }).catch(err => {
    alert('Error: ' + err.message);
  });
}

function deleteGame(id) {
  if (!confirm('Are you sure you want to DELETE this game? This cannot be undone.')) return;
  db.collection('gamesCatalog').doc(id).delete()
    .then(() => {
      alert('Game deleted.');
      loadGames();
    })
    .catch(err => {
      alert('Error deleting: ' + err.message);
    });
}
