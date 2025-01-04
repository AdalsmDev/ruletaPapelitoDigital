const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 51.42, value: 7, prize: "Premio 7" },
  { minDegree: 51.43, maxDegree: 102.84, value: 6, prize: "Premio 6" },
  { minDegree: 102.85, maxDegree: 154.26, value: 5, prize: "Premio 5" },
  { minDegree: 154.27, maxDegree: 205.68, value: 4, prize: "Premio 4" },
  { minDegree: 205.69, maxDegree: 257.1, value: 3, prize: "Premio 3" },
  { minDegree: 257.11, maxDegree: 308.52, value: 2, prize: "Premio 2" },
  { minDegree: 308.53, maxDegree: 360, value: 1, prize: "Premio 1" },
];

// Tamaño de cada segmento
const data = [1, 1, 1, 1, 1, 1, 1];
// Colores de los segmentos
var pieColors = ["#3369e8", "#009925", "#d50f25", "#EEB211"];

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
const captureAlert = () => {
  const swalElement = document.querySelector(".swal2-popup");

  if (!swalElement) {
    console.error("No se encontró el elemento de la alerta.");
    return;
  }

  // Configuración de html2canvas
  const options = {
    backgroundColor: null, // Para mantener transparencia si es necesario
    useCORS: true, // Para manejar imágenes de dominio cruzado
    willReadFrequently: true, // Sugerencia para optimizar lecturas frecuentes
    scale: 2, // Aumentar la resolución de la imagen
  };

  // Pequeño retraso para asegurar que la alerta esté completamente visible
  setTimeout(() => {
    html2canvas(swalElement, options)
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "resultado.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      })
      .catch((error) => {
        console.error("Error al capturar la alerta:", error);
      });
  }, 500); // Retraso ajustado para evitar problemas
};




// Función para determinar el premio basado en el ángulo
const valueGenerator = (angleValue) => {
  const adjustedAngle = (angleValue - 90) % 360; // Ajustar el ángulo por la posición de la flecha
  let chartLabel = null;

  const segmentAngle = 360 / data.length; // Ángulo por segmento
  const correctedAngle = (360 - adjustedAngle) % 360; // Ajuste por dirección
  const index = Math.floor(correctedAngle / segmentAngle) % data.length;

  if (index >= 0 && index < myChart.data.labels.length) {
    chartLabel = myChart.data.labels[index];
  }

  for (let i of rotationValues) {
    if (correctedAngle >= i.minDegree && correctedAngle <= i.maxDegree) {
      Swal.fire({
        title: "¡Tenemos un ganador!",
        html: `<strong>${i.prize}</strong><br><button class="btn btn-secondary mt-3" id="download-result">Descargar Resultado</button>`,
        icon: "success",
        didRender: () => {
          document
            .getElementById("download-result")
            .addEventListener("click", captureAlert);
        },
      });
      spinBtn.disabled = false;
      return;
    }
  }

  Swal.fire({
    title: "Resultado",
    html: `<strong>Chart Label: ${chartLabel}</strong><br><button class="btn btn-secondary mt-3" id="download-result">Descargar Resultado</button>`,
    icon: "info",
    didRender: () => {
      document
        .getElementById("download-result")
        .addEventListener("click", captureAlert);
    },
  });
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
