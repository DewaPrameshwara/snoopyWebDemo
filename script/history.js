const historyField = document.querySelector("main");
import { setUpdateHistoryHandler, noDataExists } from "../module/firebase/readHistoryFromFirebase.js";

setUpdateHistoryHandler((timestap, bpm, spo2) => {
  addHistory(timestap, bpm, spo2);
});

noDataExists(() => {
  noData();
});

function addHistory(timestamp, bpm, spo2) {
  historyField.innerHTML += `<div class="card mb-3 ps-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title"><i class="fa-solid fa-calendar-days fa-xl me-2"></i>${timestamp.toLocaleDateString("id-ID")}</h5>
        <p class="card-text"><strong>Apnea Terdeteksi!</strong> <br>pada pukul ${timestamp.toLocaleTimeString("id-ID")}</p>
        <p class="card-text"><strong>SPO2: ${spo2}% | BPM: ${bpm} bpm</strong></p>
      </div>
  </div>`;
}

function noData() {
  historyField.innerHTML += `
          <div class="no-data">
            <i class="fa-solid fa-thumbs-up fa-2xl mb-4" style="color: rgba(0, 0, 0, 0.3)"></i>
            <h3>TIDAK ADA RIWAYAT APNEA</h3>
          </div>`;
}
