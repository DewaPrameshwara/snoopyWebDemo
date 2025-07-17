const btn = document.getElementById("ssChart");

const readings = [
  { waktu: "2025-07-17 21:00", bpm: 60, spo2: 73 },
  { waktu: "2025-07-17 23:34", bpm: 58, spo2: 72 },
  { waktu: "2025-07-17 23:52", bpm: 63, spo2: 78 },
  { waktu: "2025-07-18 02:04", bpm: 55, spo2: 76 },
  { waktu: "2025-07-18 02:05", bpm: 59, spo2: 80 },
  { waktu: "2025-07-18 04:45", bpm: 67, spo2: 78 },
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
});
