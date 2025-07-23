let dataRencana = JSON.parse(localStorage.getItem("dataRencana")) || [];
// ===========================
// Logout Button
// ===========================
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("isAdmin");
  window.location.href = "index.html";
});

// // ===========================
// // Data Dummy Realisasi Anggaran (bisa diganti dengan fetch dari Google Spreadsheet atau backend nantinya)
// // ===========================
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
      <td>${item.link ? `<a href="${item.link}" target="_blank">Lihat</a>` : '-'}</td>
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
let isEditModeAnggaran = false;
let editIndexAnggaran = null;

function tambahAnggaran(event) {
  event.preventDefault();

  const divisi = document.getElementById("divisiInput").value;
  const saldo = document.getElementById("saldoInput").value;
  const link = document.getElementById("linkInput").value;

  if (divisi && saldo) {
    const dataBaru = { divisi, saldo: formatRupiah(saldo), link};

    if (isEditModeAnggaran && editIndexAnggaran !== null) {
      dataAnggaran[editIndexAnggaran] = dataBaru;
      isEditModeAnggaran = false;
      editIndexAnggaran = null;
    } else {
      dataAnggaran.push(dataBaru);
    }

    localStorage.setItem("dataAnggaran", JSON.stringify(dataAnggaran));
    renderTabel();
    document.getElementById("formAnggaran").reset();
  }
   document.getElementById("submitAnggaranBtn").innerText = "Tambah Data";
}


// ===========================
// Edit Data
// ===========================
function editData(index) {
  const item = dataAnggaran[index];

  document.getElementById("divisiInput").value = item.divisi;
  document.getElementById("saldoInput").value = item.saldo.replace(/[^\d]/g, "");
  document.getElementById("linkInput").value = item.link || "";


  isEditModeAnggaran = true;
  editIndexAnggaran = index;

  document.getElementById("submitAnggaranBtn").innerText = "Update Data";
 

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
   
// ===========================
// Rencana Anggaran Kerja
// ===========================

function tambahRencanaKerja(event) {
  event.preventDefault();

  const seksi = document.getElementById('seksiInput').value;
  const saldoTahunan = document.getElementById('saldoTahunanInput').value;
  const minggu1 = document.getElementById('minggu1Input').value;
  const minggu2 = document.getElementById('minggu2Input').value;
  const minggu3 = document.getElementById('minggu3Input').value;
  const minggu4 = document.getElementById('minggu4Input').value;
  const sisaSaldo = document.getElementById('sisaSaldoInput').value;
  const bulan = document.getElementById('bulanSelect').value;

  const dataBaru = {
    seksi,
    saldoTahunan,
    minggu1,
    minggu2,
    minggu3,
    minggu4,
    sisaSaldo,
    bulan
  };

  if (isEditModeRencana && editIndexRencana !== null) {
    dataRencana[editIndexRencana] = dataBaru;
    isEditModeRencana = false;
    editIndexRencana = null;
  } else {
    dataRencana.push(dataBaru);
  }

  localStorage.setItem("dataRencana", JSON.stringify(dataRencana));
  renderTabelRencana();
  document.getElementById('formRencana').reset();

  document.getElementById("submitRencanaBtn").innerText = "Tambah Data"; // setelah submit di tambahRencanaKerja
}


 function renderTabelRencana() {
  const tbody = document.getElementById('rencanaBody');
  tbody.innerHTML = '';

  dataRencana.forEach((item, index) => {
    const baris = document.createElement('tr');
    baris.setAttribute('data-bulan', item.bulan);

    baris.innerHTML = `
      <td>${item.seksi}</td>
      <td>${formatRupiah(item.saldoTahunan)}</td>
      <td>${formatRupiah(item.minggu1)}</td>
      <td>${formatRupiah(item.minggu2)}</td>
      <td>${formatRupiah(item.minggu3)}</td>
      <td>${formatRupiah(item.minggu4)}</td>
      <td>${formatRupiah(item.sisaSaldo)}</td>
      <td>${item.bulan}</td>
      <td>
        <button onclick="editBaris(${index})">Edit</button>
        <button onclick="hapusBaris(${index})">Hapus</button>
      </td>
    `;

    tbody.appendChild(baris);
  });

  filterBulan(); // tetap jalankan filter sesuai bulan terpilih
}


function hapusBaris(index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    dataRencana.splice(index, 1);
    localStorage.setItem("dataRencana", JSON.stringify(dataRencana));
    renderTabelRencana();
  }
}

let isEditModeRencana = false;
let editIndexRencana = null;

function editBaris(index) {
  const item = dataRencana[index];

  document.getElementById('seksiInput').value = item.seksi;
  document.getElementById('saldoTahunanInput').value = item.saldoTahunan;
  document.getElementById('minggu1Input').value = item.minggu1;
  document.getElementById('minggu2Input').value = item.minggu2;
  document.getElementById('minggu3Input').value = item.minggu3;
  document.getElementById('minggu4Input').value = item.minggu4;
  document.getElementById('sisaSaldoInput').value = item.sisaSaldo;
  document.getElementById('bulanSelect').value = item.bulan;

  isEditModeRencana = true;
  editIndexRencana = index;

document.getElementById("submitRencanaBtn").innerText = "Update Data"; // di editBaris


}

  window.addEventListener("load", () => {
  // yang lain tetap...
  renderTabelRencana(); // Tampilkan ulang data rencana kerja
});

function filterBulan() {
  const bulanTerpilih = document.getElementById('bulanSelect').value;
  const baris = document.querySelectorAll('#rencanaBody tr');

  baris.forEach(row => {
    const bulanData = row.getAttribute('data-bulan');
    row.style.display = (bulanData === bulanTerpilih) ? '' : 'none';
  });
}

function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
}

