const minBPM = 40;
const maxBPM = 120;
const minSPO2 = 40;
const maxSPO2 = 120;

function randomBPM() {
  return Math.floor(Math.random() * (maxBPM - minBPM)) + minBPM;
}
function randomSPO2() {
  return Math.floor(Math.random() * (maxSPO2 - minSPO2)) + minSPO2;
}

// export function random(minTm, maxTm) {
//   const readings = [];
//   for (let i = minTm; i < maxTm; i++) {
//     const d = new Date(i * 1000);
//     let date = d.toLocaleDateString();
//     let time = d.toLocaleTimeString();
//     let bpm = randomBPM();
//     let spo2 = randomSPO2();
//     readings.push({ waktu: `${date} ${time}`, bpm: bpm, spo2: spo2 });
//   }
//   return readings;
// }

export function random(minDate, maxDate, minTime, maxTime, interval) {
  // const [minY, minM, minD] = minDate.split("-").map(Number);
  // const [minH, minMin] = minTime.split(":").map(Number);
  // const [maxY, maxM, maxD] = maxDate.split("-").map(Number);
  // const [maxH, maxMin] = maxTime.split(":").map(Number);

  // Gunakan Date.UTC (hati-hati: bulan dimulai dari 0, jadi dikurangi 1)
  // const minTm = new Date(minY, minM - 1, minD, minH, minMin).getTime() / 1000;
  // const maxTm = new Date(maxY, maxM - 1, maxD, maxH, maxMin).getTime() / 1000;
  const fullMin = `${minDate}T${minTime}`;
  const fullMax = `${maxDate}T${maxTime}`;
  const minTm = new Date(fullMin).getTime() / 1000;
  const maxTm = new Date(fullMax).getTime() / 1000;

  const readings = [];
  for (let i = minTm; i < maxTm; i += parseInt(interval)) {
    const d = new Date(i * 1000);
    let date = d.toLocaleDateString();
    let time = d.toLocaleTimeString();
    let bpm = randomBPM();
    let spo2 = randomSPO2();
    readings.push({ waktu: `${date} ${time}`, bpm: bpm, spo2: spo2 });
  }
  return readings;
}
