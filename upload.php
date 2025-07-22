<?php
$dataFile = 'data.json';
$uploadDir = 'uploads/';

// Ambil data dari form
$divisi = $_POST['divisi'];
$file = $_FILES['file'];

// Cek dan buat folder upload jika belum ada
if (!is_dir($uploadDir)) {
  mkdir($uploadDir, 0755, true);
}

if ($file['type'] !== 'application/pdf') {
  die("Hanya file PDF yang diperbolehkan.");
}

$filename = uniqid() . "_" . basename($file['name']);
$targetPath = $uploadDir . $filename;

// Pindahkan file ke folder upload
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
  $entry = [
    "divisi" => $divisi,
    "file" => $filename,
    "status" => "Menunggu",
    "komentar" => "Menunggu verifikasi"
  ];

  // Ambil data lama
  $data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];

  // Update atau tambah data divisi
  $found = false;
  foreach ($data as &$d) {
    if ($d['divisi'] === $divisi) {
      $d = $entry;
      $found = true;
      break;
    }
  }
  if (!$found) $data[] = $entry;

  // Simpan ke data.json
  file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));

  echo "<script>alert('Berhasil upload!');window.location.href='index.html';</script>";
} else {
  echo "Gagal upload file.";
}
?>
