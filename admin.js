// ===========================
// Logout Button
// ===========================
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html";
});

// ===========================
// Data Dummy Realisasi Anggaran (bisa diganti dengan fetch dari Google Spreadsheet atau backend nantinya)
// ===========================
let dataAnggaran = JSON.parse(localStorage.getItem("dataAnggaran")) || [
  { divisi: "Tata Usaha", saldo: "Rp 10.000.000" },
  { divisi: "Intelijen Keimigrasian", saldo: "Rp 8.500.000" },
  { divisi: "Lalu Lintas Keimigrasian", saldo: "Rp 6.750.000" }
];

// ===========================
// Render Tabel Anggaran
// ===========================
function renderTabel() {
  const tbody = document.getElementById("anggaranBody");
  tbody.innerHTML = "";

  dataAnggaran.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.divisi}</td>
      <td>${item.saldo}</td>
      <td>
        <button onclick="editData(${index})"><i class="fa fa-edit"></i> Edit</button>
        <button onclick="hapusData(${index})"><i class="fa fa-trash"></i> Hapus</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  localStorage.setItem("dataAnggaran", JSON.stringify(dataAnggaran));
}
renderTabel();

// ===========================
// Tambah Data
// ===========================
function tambahData() {
  const divisi = prompt("Masukkan nama divisi:");
  const saldo = prompt("Masukkan sisa saldo:");

  if (divisi && saldo) {
    dataAnggaran.push({ divisi, saldo });
    renderTabel();
  }
}

// ===========================
// Edit Data
// ===========================
function editData(index) {
  const divisi = prompt("Edit nama divisi:", dataAnggaran[index].divisi);
  const saldo = prompt("Edit saldo:", dataAnggaran[index].saldo);

  if (divisi && saldo) {
    dataAnggaran[index] = { divisi, saldo };
    renderTabel();
  }
}

// ===========================
// Hapus Data
// ===========================
function hapusData(index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    dataAnggaran.splice(index, 1);
    renderTabel();
  }
}

// ===========================
// Upload Struktur Organisasi (Gambar)
// ===========================
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("strukturInput");
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    document.getElementById("previewStruktur").src = e.target.result;
    localStorage.setItem("strukturOrganisasi", e.target.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

// Load struktur organisasi dari localStorage saat halaman dibuka
window.addEventListener("load", () => {
  const struktur = localStorage.getItem("strukturOrganisasi");
  if (struktur) {
    document.getElementById("previewStruktur").src = struktur;
  }

  const rpdName = localStorage.getItem("rpdFileName");
  if (rpdName) {
    document.getElementById("rpdFileName").innerText = rpdName;
  }
});

// ===========================
// Upload RPD (PDF)
// ===========================
document.getElementById("rpdForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("rpdInput");
  const file = input.files[0];

  if (file && file.type === "application/pdf") {
    document.getElementById("rpdFileName").innerText = `File saat ini: ${file.name}`;
    localStorage.setItem("rpdFileName", `File saat ini: ${file.name}`);
  } else {
    alert("Mohon unggah file PDF.");
  }
});
   