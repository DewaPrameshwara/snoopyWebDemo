import { random } from "../module/dataDummyMonitoring.js";
const ctx = document.getElementById("Chart");
const dataSPO2 = document.getElementById("data-spo2");
const dataBPM = document.getElementById("data-bpm");
const monitoringBtn = document.getElementById("monitoring-btn");
const demoMonitoringBtn = document.getElementById("demo-monitoring-btn");
const alertPlaceHolder = document.querySelector(".alert-placeHolder");

const minDate = document.getElementById("min-date");
const maxDate = document.getElementById("max-date");
const minTime = document.getElementById("min-time");
const maxTime = document.getElementById("max-time");
const interval = document.getElementById("interval");

const filterOffCanvas = document.getElementById("filter-offcanvas");
const popUp = filterOffCanvas.querySelector(".filter");

let startMonitor = false;
let intervalId;
const btn = document.getElementById("ssChart");
const submitBtn = document.getElementById("submitSsChart");
const cancelSubmit = document.getElementById("submitSsChartCancel");
// const readings = [
//   { waktu: "2025-07-17 21:00:04", bpm: 60, spo2: 87 },
//   { waktu: "2025-07-17 21:00:05", bpm: 62, spo2: 87 },
//   { waktu: "2025-07-17 21:00:06", bpm: 63, spo2: 89 },
//   { waktu: "2025-07-17 21:00:07", bpm: 67, spo2: 88 },
//   { waktu: "2025-07-17 21:00:08", bpm: 70, spo2: 90 },
//   { waktu: "2025-07-17 21:00:09", bpm: 73, spo2: 91 },
// ];

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
  filterOffCanvas.classList.remove("d-none");
  cancelSubmit.addEventListener("click", () => {
    filterOffCanvas.classList.add("d-none");
    resetFilterInput();
  });
  document.addEventListener("click", (e) => {
    if (!popUp.contains(e.target) && !btn.contains(e.target)) {
      filterOffCanvas.classList.add("d-none");
    }
  });
});

submitBtn.addEventListener("click", () => {
  const doc = new jsPDF();

  const data_minDate = minDate.value;
  const data_maxDate = maxDate.value;
  const data_minTime = minTime.value;
  const data_maxTime = maxTime.value;
  const data_interval = interval.value;
  if (data_interval > 3600) {
    alert("Jumlah interval terlalu tinggi.\nMaksimal 3600 detik (1 jam)");
  }
  const readings = random(data_minDate, data_maxDate, data_minTime, data_maxTime, data_interval);
  console.log(readings);
  console.log({ data_minDate, data_maxDate, data_minTime, data_maxTime, data_interval });
  // const date = new Date();
  if (readings.length == 0) {
    alert("Tidak ada data dalam rentang waktu tersebut.");
    return;
  }
  const first = readings[0].waktu;
  const last = readings[readings.length - 1].waktu;

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

    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  // Unduh file PDF
  const fileName = `Laporan Snoopy ${first} sampai ${last}.pdf`;
  doc.save(fileName);
  alert(`File telah disimpan sebagai "${fileName}", periksa folder Unduhan anda`);
  filterOffCanvas.classList.add("d-none");
  location.reload();
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

function resetFilterInput() {
  minDate.value = "";
  maxDate.value = "";
  minTime.value = "";
  maxTime.value = "";
  interval.value = 1;
}
