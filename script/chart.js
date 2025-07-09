const ctx = document.getElementById("Chart");
const elementSPO2 = document.getElementById("data-spo2");
const elementBPM = document.getElementById("data-bpm");
const monitoringBtn = document.getElementById("monitoring-btn");
const ssButton = document.getElementById("ssChart");
const alertPlaceHolder = document.querySelector(".alert-placeHolder");
let startMonitor = false;
import { setUpdateDataHandler, setUpWatch } from "../module/firebase/readDataFromFirebase.js";
let intervalId;

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
  if (!startMonitor) {
    startMonitor = true;
    monitoringBtn.innerHTML = "Stop Monitoring";
    monitoringBtn.classList.add("btn-danger");
    monitoringBtn.classList.remove("btn-primary");
    readData();
  } else {
    clearInterval(intervalId);
    startMonitor = false;
    monitoringBtn.innerHTML = "Start Monitoring";
    monitoringBtn.classList.remove("btn-danger");
    monitoringBtn.classList.add("btn-primary");
  }
});

ssButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = chart.toBase64Image();
  link.download = `snoopy's chart~${new Date().toISOString().slice(0, 19).replace("T", "~").replace(/:/g, ".")}~.png`;
  link.click();
});

function readData() {
  if (startMonitor) {
    setUpWatch((activated, wifiConnected, fingerDetected) => {
      console.log("pp");
      if (activated == 0) {
        showAlert("Hidupkan alat terlebih dahulu");
      } else if (wifiConnected == 0) {
        showAlert("Terdapat masalah koneksi pada alat");
      } else if (fingerDetected == 0) {
        showAlert("Sensor tidak dapat mendeteksi, pastikan alat terpasang dengan baik");
      } else if (activated == 1 && wifiConnected == 1 && fingerDetected == 1) {
        setUpdateDataHandler((bpm, spo2) => {
          updateChart(bpm, spo2);
        });
      }
    });
  }
}

function updateChart(bpm, spo2) {
  const time = new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(spo2);
  chart.data.datasets[1].data.push(bpm);

  elementSPO2.innerHTML = `${spo2} %`;
  elementBPM.innerHTML = `${bpm} bpm`;

  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
    chart.data.datasets[1].data.shift();
  }

  chart.update();
}

function showAlert(msg) {
  alertPlaceHolder.innerHTML += `            
  <div class="alert alert-warning alert-dismissible" role="alert">
    <strong>${msg}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
}
// function readData() {
//   intervalId = setInterval(() => {
//     const time = new Date().toLocaleTimeString();
//     // const value_spo2 = Math.floor(Math.random() * 61) + 40;
//     // const value_bpm = Math.floor(Math.random() * 61) + 40;

//     chart.data.labels.push(time);
//     chart.data.datasets[0].data.push(value_spo2);
//     chart.data.datasets[1].data.push(value_bpm);

//     dataSPO2.innerHTML = `${value_spo2} %`;
//     dataBPM.innerHTML = `${value_bpm} bpm`;

//     if (chart.data.labels.length > 20) {
//       chart.data.labels.shift();
//       chart.data.datasets[0].data.shift();
//       chart.data.datasets[1].data.shift();
//     }

//     chart.update();
//   }, 1000);
// }
