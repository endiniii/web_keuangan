const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

// Baca data JSON
app.get('/rencana', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Gagal membaca data.');
    res.send(JSON.parse(data));
  });
});

// Simpan data JSON
app.post('/rencana', (req, res) => {
  const newData = req.body;
  fs.writeFile('data.json', JSON.stringify(newData, null, 2), err => {
    if (err) return res.status(500).send('Gagal menyimpan data.');
    res.send({ status: 'success' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
