// admin.js — must be placed in the same folder as your other public files

// Firestore reference
const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (!user) {
    // not logged in → redirect to login
    window.location.href = 'login.html';
    return;
  }
  // check if user is admin
  db.collection('users').doc(user.uid).get().then(doc => {
    if (!doc.exists || doc.data().role !== 'admin') {
      alert('Access denied: Not an admin');
      window.location.href = 'josh game store.html';
      return;
    }
    // else: user is admin → allow form usage
  }).catch(err => {
    console.error(err);
    alert('Error verifying admin role');
    window.location.href = 'josh game store.html';
  });
});

function addGame() {
  const name = document.getElementById('gameName').value.trim();
  const desc = document.getElementById('gameDesc').value.trim();
  const gameId = document.getElementById('gameId').value.trim();
  const priceRaw = document.getElementById('price').value.trim();
  const thumb = document.getElementById('thumb').value.trim();

  if (!name || !gameId || priceRaw === '') {
    document.getElementById('message').innerText = 'Please fill required fields.';
    return;
  }
  const price = parseFloat(priceRaw);
  if (isNaN(price)) {
    document.getElementById('message').innerText = 'Price must be a number.';
    return;
  }

  db.collection('gamesCatalog').doc(gameId).set({
    gameId: gameId,
    name: name,
    description: desc,
    price: price,
    thumbnail: thumb
  }).then(() => {
    document.getElementById('message').style.color = '#9fe3ff';
    document.getElementById('message').innerText = 'Game added successfully!';
  }).catch(err => {
    document.getElementById('message').style.color = '#ff6b6b';
    document.getElementById('message').innerText = 'Error: ' + err.message;
  });
}
