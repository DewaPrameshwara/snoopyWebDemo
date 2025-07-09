import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "../../config/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// tidak langsung pasang listener di sini ❌
let setupListenerAttached = false;
let sensorListenerAttached = false;

export function setUpWatch(handler) {
  if (!setupListenerAttached) {
    const setUpRef = ref(db, "SetUp/");
    onValue(setUpRef, (snapshot) => {
      const data = snapshot.val();
      const activated = data.Activated;
      const wifiConnected = data.WiFiConnected;
      const fingerDetected = data.FingerDetected;
      handler(activated, wifiConnected, fingerDetected);
    });
    setupListenerAttached = true;
  }
}

export function setUpdateDataHandler(handler) {
  if (!sensorListenerAttached) {
    const sensorRef = ref(db, "Sensor/");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      const dataBPM = data.BPM;
      const dataSPO2 = data.SPO2;
      handler(dataBPM, dataSPO2);
    });
    sensorListenerAttached = true;
  }
}
