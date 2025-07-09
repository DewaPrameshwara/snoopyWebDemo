import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "../../config/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const historyRef = ref(db, "History/");
let onDateUpdate = () => {};
let onDataEmpty = () => {};

get(historyRef)
  .then((snapshot) => {
    if (!snapshot.exists() || Object.keys(snapshot.val()).length === 0) {
      onDataEmpty();
      return;
    }

    const historyData = snapshot.val();

    Object.values(historyData)
      .sort((a, b) => b.Timestamp - a.Timestamp)
      .forEach((entry) => {
        const timestamp = new Date(entry.Timestamp);
        const bpm = entry.BPM;
        const spo2 = entry.SPO2;
        onDateUpdate(timestamp, bpm, spo2);
      });
  })
  .catch((err) => {
    console.error(err);
  });

// export for history.js
export function setUpdateHistoryHandler(handler) {
  onDateUpdate = handler;
}

export function noDataExists(handler) {
  onDataEmpty = handler;
}
