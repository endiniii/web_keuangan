document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simulasi user (nanti bisa ganti autentikasi ke backend)
  const adminUsername = "admin";
  const adminPassword = "admin123";

  if (username === adminUsername && password === adminPassword) {
    // Simpan status login ke localStorage
    localStorage.setItem("isAdmin", "true");

    // Redirect ke dashboard admin
    window.location.href = "admin.html";
  } else {
    document.getElementById("loginError").innerText = "Username atau password salah.";
  }
});

