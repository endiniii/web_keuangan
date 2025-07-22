fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#statusTable tbody");
    data.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.divisi}</td>
        <td><a href="uploads/${entry.file}" target="_blank">${entry.file}</a></td>
        <td>${entry.status}</td>
        <td>${entry.komentar}</td>
      `;
      tbody.appendChild(row);
    });
  });
