// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpXU8LFER9qDHti7UK83GptDdTiZOvDqw",
  authDomain: "indie-arcade-platform-js.firebaseapp.com",
  projectId: "indie-arcade-platform-js",
  storageBucket: "indie-arcade-platform-js.firebasestorage.app",
  messagingSenderId: "942265821278",
  appId: "1:942265821278:web:c3859da9434d21b4d4accf",
  measurementId: "G-JR003BXSX8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ---------- LOGIN ----------
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "josh game store.html";
    })
    .catch(error => {
      document.getElementById("error").innerText = error.message;
    });
}

// ---------- SIGNUP ----------
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch(error => {
      document.getElementById("error").innerText = error.message;
    });
}
