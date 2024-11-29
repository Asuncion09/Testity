// URL de la API
const API_URL = "http://localhost:3000/api/pruebas";

// Cargar las pruebas al inicio
document.addEventListener("DOMContentLoaded", () => {
  const pruebasContainer = document.getElementById("pruebas-container");
  if (pruebasContainer) {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error en la solicitud: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        const pruebasContainer = document.getElementById("pruebas-container");
        pruebasContainer.innerHTML = "";

        data.data.forEach((prueba, index) => {
          const equipoPruebas = prueba.equipoPruebas || [];
          const observaciones = prueba.observaciones || [];
          const configuracionPrueba = renderKeyValueList(prueba.configuracionPrueba || {});
          const resultadosEsperados = renderKeyValueList(prueba.resultadosEsperados || {});
          const resultadosObtenidos = renderKeyValueList(prueba.resultadosObtenidos || {});
          const conclusiones = renderKeyValueList(prueba.conclusiones || {});

          const pruebaDiv = document.createElement("div");
          pruebaDiv.classList.add("card");
          pruebaDiv.innerHTML = `
          <h3>Prueba ${index + 1}</h3>
          <p><strong>Proyecto:</strong> ${prueba.proyecto}</p>
          <p><strong>Fecha:</strong> ${prueba.fechaPrueba}</p>
          
          <p><strong>Equipo de Pruebas:</strong></p>
          <ul>
            ${equipoPruebas.map((miembro) => `<li>${miembro}</li>`).join("")}
          </ul>
          
          <p><strong>Requisitos Probados:</strong></p>
          <ul>
            ${prueba.requisitosProbados
              .map((requisito) => `<li>${requisito}</li>`)
              .join("")}
          </ul>

          <p><strong>Configuración de Prueba:</strong></p>
          <ul>${configuracionPrueba}</ul>

          <p><strong>Pasos de Prueba:</strong></p>
          <ul>
            ${prueba.pasosPrueba.map((paso) => `<li>${paso}</li>`).join("")}
          </ul>

          <p><strong>Resultados Esperados:</strong></p>
          <ul>${resultadosEsperados}</ul>

          <p><strong>Resultados Obtenidos:</strong></p>
          <ul>${resultadosObtenidos}</ul>

          <p><strong>Conclusiones:</strong></p>
          <ul>${conclusiones}</ul>

          <div class="observaciones">
            <span><strong>Observaciones:</strong></span>
            <ul>
              ${observaciones.map((obs) => `<li>${obs}</li>`).join("")}
            </ul>
          </div>
        `;
          pruebasContainer.appendChild(pruebaDiv);
        });
      })
      .catch((error) => {
        console.error("Error al cargar las pruebas:", error);
        document.getElementById(
          "pruebas-container"
        ).innerHTML = `<p>Error al cargar las pruebas: ${error.message}</p>`;
      });
  }

  // Lógica para agregar una nueva prueba
  const formAgregar = document.getElementById("agregarPruebaForm");
  if (formAgregar) {
    formAgregar.addEventListener("submit", (event) => {
      event.preventDefault();

      // Recopilar datos del formulario dinámico
      const equipoPruebas = Array.from(
        document.querySelectorAll('[name="equipoPruebas[]"]')
      ).map((input) => input.value);

      const observaciones = Array.from(
        document.querySelectorAll('[name="observaciones[]"]')
      ).map((input) => input.value);

      const nuevaPrueba = {
        proyecto: document.getElementById("proyecto").value,
        fechaPrueba: document.getElementById("fechaPrueba").value,
        equipoPruebas,
        requisitosProbados: document
          .getElementById("requisitosProbados")
          .value.split(",")
          .map((item) => item.trim()),
        configuracionPrueba: JSON.parse(
          document.getElementById("configuracionPrueba").value || "{}"
        ),
        pasosPrueba: document
          .getElementById("pasosPrueba")
          .value.split(",")
          .map((item) => item.trim()),
        resultadosEsperados: JSON.parse(
          document.getElementById("resultadosEsperados").value || "{}"
        ),
        resultadosObtenidos: JSON.parse(
          document.getElementById("resultadosObtenidos").value || "{}"
        ),
        conclusiones: JSON.parse(
          document.getElementById("conclusiones").value || "{}"
        ),
        observaciones,
      };

      // Enviar la nueva prueba a la API
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaPrueba),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Error en la solicitud: ${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          alert("Prueba agregada exitosamente");
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert("Error al agregar la prueba");
          console.error(error);
        });
    });
  }
});

function renderKeyValueList(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join("");
}
