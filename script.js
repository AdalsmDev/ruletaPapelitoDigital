const wheel = document.getElementById("wheel");
const spinImage = document.getElementById("spin-image");
const finalValue = document.getElementById("final-value");

// Mensaje inicial
finalValue.innerHTML = `Haga clic en la Ruleta...¡Suerte y a Ganar!`;

const rotationValues = [
  { minDegree: 0, maxDegree: 51.42, value: 7, prize: "🚀 1 Licencia Version MultiCaja" },
  { minDegree: 51.43, maxDegree: 102.84, value: 6, prize: "🏅 10% descuento proxima compra" },
  { minDegree: 102.85, maxDegree: 154.26, value: 5, prize: "💻 3 Licencias Version UniCaja" },
  { minDegree: 154.27, maxDegree: 205.68, value: 4, prize: "🏆 50% descuento proxima compra" },
  { minDegree: 205.69, maxDegree: 257.1, value: 3, prize: "📱 2 Licencias Version UniCaja" },
  { minDegree: 257.11, maxDegree: 308.52, value: 2, prize: "💸 30% descuento proxima compra" },
  { minDegree: 308.53, maxDegree: 360, value: 1, prize: "🖥️ 1 Licencia Version UniCaja" },
];

// Tamaño de cada segmento
const data = [1, 1, 1, 1, 1, 1, 1];
// Colores de los segmentos
const pieColors = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#8549ba",
  "#166a8f",
  "#00a950",
  "#58595b"
];

// Crear el gráfico
let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [
      "🚀",
      "🏅",
      "💻",
      "🏆",
      "📱",
      "💸",
      "🖥️"
    ],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        rotation: 0,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 18 },
      },
    },
  },
});



// Capturar el botón "Conoce los premios"
const btnPremios = document.getElementById("btn-premios");

// Evento click para mostrar los premios
btnPremios.addEventListener("click", () => {
  Swal.fire({
    title: '<span style="font-size: 1.7rem;">🎁 Premios disponibles</span>',
    html: `
      <ul style="text-align: left; font-size: 1.3rem; margin: 0 auto; width: 80%;">
        <li>🚀 1 Licencia Versión MultiCaja</li>
        <li>🏆 50% de descuento en tu próxima compra</li>
        <li>💻 3 Licencias Versión UniCaja</li>
        <li>💸 30% de descuento en tu próxima compra</li>
        <li>📱 2 Licencias Versión UniCaja</li>
        <li>🏅 10% de descuento en tu próxima compra</li>
        <li>🖥️ 1 Licencia Versión UniCaja</li>
      </ul>
    `,
    confirmButtonText: "¡Fantastico!",
    confirmButtonColor: "#4CAF50",
  });
});


// Selecciona el botón de "Reclama tu premio"
const btnReclamar = document.getElementById("btn-reclamar");

// Maneja el clic en el botón
btnReclamar.addEventListener("click", () => {
  Swal.fire({
    title: "🚀 ¡Reclama tu premio fácilmente! 🎉",
    html: `
      <div style="text-align: left; font-size: 1.1rem;">
        <ol style="padding-left: 20px; line-height: 1.6;">
          <li><strong>Gira la ruleta.</strong></li>
          <li><strong>Toma una captura de pantalla</strong> 📸 de tu premio.</li>
          <li>
            <strong>Envía tu captura al WhatsApp</strong> 
            <a href="https://wa.me/5212281649917" target="_blank" style="color: #25D366; text-decoration: none;">
              💬 WhatsApp 228 164 9917
            </a>
            para reclamar tu premio.
          </li>
        </ol>
        <p style="margin-top: 1rem;">🎁 ¡Es rápido, sencillo y estarás más cerca de tu premio!</p>
      </div>
    `,
    confirmButtonText: "¡Entendido! 🎯",
    confirmButtonColor: "#4CAF50",
  });
});


// Selecciona el botón de "Más detalles"
const btnDetalles = document.getElementById("btn-detalles");

// Maneja el clic en el botón
btnDetalles.addEventListener("click", () => {
  Swal.fire({
    title: "💡 ¡Más detalles sobre tu premio!",
    html: `
      <div style="text-align: left; font-size: 1.1rem;">
        <p><strong>📌 Tu premio estará disponible:</strong></p>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li><strong>📆 Fecha de lanzamiento:</strong></li>
          <ul>
            <li>🖥️ <strong>Windows:</strong> App Papelito Notas de Venta Digitales - Edición Folios ilimitados disponible el <strong>25 de enero de 2025</strong>.</li>
            <li>📲 <strong>Mac y Móviles:</strong> Aplicaciones para iOS y Android estarán disponibles poco después del lanzamiento de la versión para Windows, <strong>sin costo adicional</strong>.</li>
          </ul>
        </ul>
        <p><strong>✅ Todas las ofertas de preventa incluyen:</strong></p>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li>3 Apps a elegir: Windows, Mac, iOS o Android.</li>
          <li>Folios ilimitados en cada App.</li>
          <li>3 licencias: 1 por cada App, úsalas como quieras.</li>
          <li>Actualizaciones gratuitas dentro de la misma versión.</li>
        </ul>
        <p>🎁 <strong>Importante:</strong></p>
        <p style="margin-top: 1rem;">
          Este premio es exclusivo para <strong>clientes registrados</strong> que hayan realizado una compra. 
          Si aún no eres cliente, ¡anímate y obtén acceso a estas increíbles ofertas! 🚀
        </p>
      </div>
    `,
    confirmButtonText: "¡Entendido! 🎯",
    confirmButtonColor: "#007BFF",
  });
});



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
        title: '<span style="font-size: 1.7rem;">🏆 ¡Aquí tienes tu Premio! 🎉</span>',
        html: `
        <div style="background-color:rgb(248, 224, 6); 
        border: 1px solid #dcdcdc; padding: 15px; 
        border-radius: 5px; color: #333; font-size: 1.2rem;
        font-weight: bold;">  ${i.prize}  </div> <!-- Subtítulo destacado -->
      
        <p style="font-size: 1.3rem; color: #555; margin-top: 1rem;">
          📸 Ahora ¡Toma una captura de pantalla! <br>
        </p> <!-- Texto pequeño con indicación -->
      
        <div style="background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-top: 1rem; display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.0rem; color: #333;">
             Envía tu captura al 
            <a href="https://wa.me/5212281649917" style="color: #25D366; text-decoration: none; font-weight: bold;">
              💬 WhatsApp 228 164 9917
            </a> para reclamar tu premio! 🚀
          </span>
        </div> <!-- Contenedor con el mensaje de WhatsApp -->
      `,
      
      
        confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> ¡Felicidades! Gracias por participar.
        `,

        didOpen: () => {
          launchConfetti();
        },


        willClose: () => {
          stopConfetti();
          resetState();
        }
      }).then(() => {
        spinImage.style.pointerEvents = "auto"; // Reactivar clics
        wheel.style.pointerEvents = "auto"; // Reactivar clics
      });
      return;
    }
  }

  Swal.fire({
    title: "Resultado🖼️",
    html: `<strong>Chart Label: ${chartLabel}</strong>`,
    icon: "info",
    willClose: () => {
      stopConfetti();
      resetState();
    }
  }).then(() => {
    spinImage.style.pointerEvents = "auto"; // Reactivar clics
    wheel.style.pointerEvents = "auto"; // Reactivar clics
  });
};

// Variable para almacenar el intervalo del confeti
let confettiInterval;

// Función para lanzar confeti
function launchConfetti() {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  confettiInterval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(confettiInterval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

// Función para detener el confeti
function stopConfetti() {
  clearInterval(confettiInterval);
}

// Función para resetear el estado
function resetState() {
  finalValue.innerHTML = "¿Quieres intentarlo otra vez?"; // Mensaje de reinicio
}

// Variables de animación
let baseRotation = 0;

// Evento de rotación
const spinWheel = () => {
  spinImage.style.pointerEvents = "none"; // Deshabilita clics mientras gira
  wheel.style.pointerEvents = "none"; // Deshabilita clics mientras gira
  finalValue.innerHTML = `¡Girando...!`;

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
      finalValue.innerHTML = `¡Felicidades, gracias por participar...!`;
      baseRotation = myChart.options.rotation % 360; // Guardar el estado final
      valueGenerator(baseRotation);
    }
  }, intervalSpeed);
};

// Evento de clic tanto en la ruleta como en la imagen
wheel.addEventListener("click", spinWheel);
spinImage.addEventListener("click", spinWheel);
