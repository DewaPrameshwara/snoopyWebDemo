const btn = document.getElementById("ssChart");

const readings = [
  { waktu: "2025-07-17 21:00:04", bpm: 60, spo2: 87 },
  { waktu: "2025-07-17 21:00:05", bpm: 62, spo2: 87 },
  { waktu: "2025-07-17 21:00:06", bpm: 63, spo2: 89 },
  { waktu: "2025-07-17 21:00:07", bpm: 67, spo2: 88 },
  { waktu: "2025-07-17 21:00:08", bpm: 70, spo2: 90 },
  { waktu: "2025-07-17 21:00:09", bpm: 73, spo2: 91 },
];

const doc = new jsPDF();

btn.addEventListener("click", () => {
  const date = new Date();
  const first = readings[0].waktu.toLocaleString();
  const last = readings[readings.length - 1].waktu.toLocaleString();

  const pageWidth = doc.internal.pageSize.getWidth();
  const title = `Laporan Pembacaan Snoopy`;
  const subtitle = `${first} sampai ${last}`;

  // Judul Tengah
  const titleWidth = doc.getTextWidth(title);
  const subtitleWidth = doc.getTextWidth(subtitle);
  const xTitle = (pageWidth - titleWidth) / 2;
  const xSubtitle = (pageWidth - subtitleWidth) / 2;
  const startY = 15;
  let y = startY + 10;
  doc.text(title, xTitle, startY);
  doc.text(subtitle, xSubtitle, y);

  // Header Tabel
  y = startY + 35;
  doc.setFont("helvetica", "bold");
  doc.text("Waktu", 14, y);
  doc.text("BPM", 80, y);
  doc.text("SPO2", 130, y);
  doc.setFont("helvetica", "normal");

  // Isi Tabel
  y = y + 10;
  readings.forEach((r) => {
    doc.text(r.waktu, 14, y);
    doc.text(r.bpm.toString(), 80, y);
    doc.text(r.spo2.toString(), 130, y);
    y += 10;
  });

  // Unduh file PDF
  doc.save(`Laporan Snoopy ${date.toLocaleDateString()}.pdf`);
  alert(`File telah disimpan sebagai "Laporan Snoopy ${date.toLocaleDateString()}.pdf", periksa folder Unduhan anda`);
});
