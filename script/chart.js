const ctx = document.getElementById("Chart");
const dataSPO2 = document.getElementById("data-spo2");
const dataBPM = document.getElementById("data-bpm");
const monitoringBtn = document.getElementById("monitoring-btn");
const demoMonitoringBtn = document.getElementById("demo-monitoring-btn");
const alertPlaceHolder = document.querySelector(".alert-placeHolder");
let startMonitor = false;
let intervalId;
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

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "SPO2",
        data: [],
        fill: false,
        borderColor: "rgb(65, 184, 213)",
        tension: 0.1,
      },
      {
        label: "BPM",
        data: [],
        fill: false,
        borderColor: "rgb(211, 13, 102)",
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: 500,
      easing: "easeInOutCubic",
    },
    maintainAspectRatio: true,
    scales: {
      y: {
        min: 40,
        max: 122,
        ticks: {
          stepSize: 1,
        },
      },
    },
  },
});

monitoringBtn.addEventListener("click", () => {
  showAlert();
});

demoMonitoringBtn.addEventListener("click", () => {
  if (!startMonitor) {
    startMonitor = true;
    simulation();
    demoMonitoringBtn.innerHTML = "Stop Monitoring (Demo)";
    demoMonitoringBtn.classList.add("btn-danger");
    demoMonitoringBtn.classList.remove("btn-success");
  } else {
    clearInterval(intervalId);
    startMonitor = false;
    demoMonitoringBtn.innerHTML = "Start Monitoring (Demo)";
    demoMonitoringBtn.classList.remove("btn-danger");
    demoMonitoringBtn.classList.add("btn-success");
  }
});

btn.addEventListener("click", () => {
  if (!startMonitor) {
    alert("Perekaman belum dimulai");
    return;
  }
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

// simulasi
function simulation() {
  intervalId = setInterval(() => {
    const time = new Date().toLocaleTimeString();
    const value_spo2 = Math.floor(Math.random() * 61) + 40;
    const value_bpm = Math.floor(Math.random() * 61) + 40;

    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(value_spo2);
    chart.data.datasets[1].data.push(value_bpm);

    dataSPO2.innerHTML = `${value_spo2} %`;
    dataBPM.innerHTML = `${value_bpm} bpm`;

    if (chart.data.labels.length > 20) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
      chart.data.datasets[1].data.shift();
    }

    chart.update();
  }, 1000);
}

function showAlert() {
  alertPlaceHolder.innerHTML += `            
  <div class="alert alert-warning alert-dismissible" role="alert">
    <div>
      <strong>Terjadi kesalahan pada alat snoopy</strong>
      <p style="font-size: .8rem;">Nyalakan alat atau periksa koneksi</p>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
}
