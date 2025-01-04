const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 51.42, value: 7, prize: "p7" },
  { minDegree: 51.43, maxDegree: 102.84, value: 6, prize: "p6" },
  { minDegree: 102.85, maxDegree: 154.26, value: 5, prize: "p5" },
  { minDegree: 154.27, maxDegree: 205.68, value: 4, prize: "p4" },
  { minDegree: 205.69, maxDegree: 257.1, value: 3, prize: "p3" },
  { minDegree: 257.11, maxDegree: 308.52, value: 2, prize: "p2" },
  { minDegree: 308.53, maxDegree: 360, value: 1, prize: "p1" },
];

//Size of each piece
const data = [1, 1, 1, 1, 1, 1, 1];
//background color for each piece
var pieColors = [
  "#3369e8",
  "#009925",
  "#d50f25",
  "#EEB211",
];


// Crear el gráfico
let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [7, 6, 5, 4, 3, 2, 1],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 18 },
      },
    },
  },
});




// Función para determinar el premio basado en el ángulo
const valueGenerator = (angleValue) => {
  const adjustedAngle = (angleValue - 90) % 360; // Ajustar el ángulo por la posición de la flecha
  let chartLabel = null;

  // Ajustar el índice con base en la nueva referencia
  const segmentAngle = 360 / data.length; // Ángulo por segmento
  const correctedAngle = (360 - adjustedAngle) % 360; // Ajuste por dirección
  const index = Math.floor(correctedAngle / segmentAngle) % data.length;

  // Verificar si el índice es válido
  if (index >= 0 && index < myChart.data.labels.length) {
    chartLabel = myChart.data.labels[index];
  }

  // Determinar el premio
  for (let i of rotationValues) {
    if (correctedAngle >= i.minDegree && correctedAngle <= i.maxDegree) {
      finalValue.innerHTML = `<p>Premios: ${i.prize} (Value: ${i.value}, Chart Label: ${chartLabel})</p>`;
      spinBtn.disabled = false;
      return;
    }
  }

  // Si no coincide ningún rango, mostrar sólo el chartLabel
  finalValue.innerHTML = `<p>Chart Label: ${chartLabel}</p>`;
};



// Variables de animación
let baseRotation = 0;

// Evento de rotación
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>¡Girando!</p>`;

  let randomDegree = Math.floor(Math.random() * 360); // Ángulo aleatorio

  const targetRotation = baseRotation + randomDegree + 360 * 5; // Rotar hacia el lado derecho
  const intervalSpeed = 10;
  const totalTime = 4000;
  const steps = totalTime / intervalSpeed;
  let currentStep = 0;

  const rotationInterval = setInterval(() => {
    currentStep++;
    const easingFactor = Math.pow(currentStep / steps, 3); // Suavizar el giro
    myChart.options.rotation = baseRotation + (targetRotation - baseRotation) * easingFactor;
    myChart.update();

    if (currentStep >= steps) {
      clearInterval(rotationInterval);
      baseRotation = myChart.options.rotation % 360; // Guardar el estado final
      valueGenerator(baseRotation);
    }
  }, intervalSpeed);
});
