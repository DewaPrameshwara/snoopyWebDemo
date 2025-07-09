const ctx = document.getElementById("Chart");
const dataSPO2 = document.getElementById("data-spo2");
const dataBPM = document.getElementById("data-bpm");
const monitoringBtn = document.getElementById("monitoring-btn");
const demoMonitoringBtn = document.getElementById("demo-monitoring-btn");
const alertPlaceHolder = document.querySelector(".alert-placeHolder");
const ssButton = document.getElementById("ssChart");
let startMonitor = false;
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

ssButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = chart.toBase64Image();
  link.download = `snoopy's chart-${new Date().toISOString().slice(0, 19)}.png`;
  link.click();
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
    <strong>Nyalakan alat SNOOPY terlebih dahulu!</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
}
