const historyField = document.querySelector("main");
const demoBtn = document.querySelectorAll(".demo-btn");
const noData = document.querySelector(".no-data");
const data = historyField.querySelectorAll(".card");
const btn = document.getElementById("downloadBtn");
const readings = [
  { waktu: "08/07/202 23.07.20", bpm: 55, spo2: 73 },
  { waktu: "10/07/2025 23.57.50", bpm: 63, spo2: 74 },
  { waktu: "16/07/2025 22.07.34", bpm: 59, spo2: 74 },
  { waktu: "17/07/2025 00.07.02", bpm: 55, spo2: 77 },
  { waktu: "23/07/2025 04.54.20", bpm: 56, spo2: 80 },
  { waktu: "27/07/2025 22.47.26", bpm: 55, spo2: 73 },
  { waktu: "30/07/2025 00.07.20", bpm: 55, spo2: 74 },
  { waktu: "30/07/2025 02.17.29", bpm: 59, spo2: 73 },
];
const doc = new jsPDF();
let dataExist = true;

demoBtn.forEach((e) => {
  e.addEventListener("click", () => {
    noData.classList.toggle("d-none");
    data.forEach((e) => {
      e.classList.toggle("d-none");
    });
    dataExist = !dataExist;
  });
});

btn.addEventListener("click", () => {
  if (!dataExist) {
    alert("Belum ada riwayat apnea");
    return;
  }
  const pageWidth = doc.internal.pageSize.getWidth();
  const title = `Riwayat Apnea`;

  // Judul Tengah
  const titleWidth = doc.getTextWidth(title);
  const xTitle = (pageWidth - titleWidth) / 2;
  const startY = 15;
  let y = startY + 10;
  doc.text(title, xTitle, startY);

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
  doc.save(`Riwayat Apnea.pdf`);
  alert(`File telah disimpan sebagai "Riwayat Apnea.pdf", periksa folder Unduhan anda`);
});
