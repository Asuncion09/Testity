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
            `Error en la solicitud: ${response.status} ${response.statusText}`,
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
          const configuracionPrueba = renderKeyValueList(
            prueba.configuracionPrueba || {},
          );
          const resultadosEsperados = renderKeyValueList(
            prueba.resultadosEsperados || {},
          );
          const resultadosObtenidos = renderKeyValueList(
            prueba.resultadosObtenidos || {},
          );
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
          <ul id="resultados-obtenidos-${index}">
          ${Object.entries(prueba.resultadosObtenidos || {})
            .map(
              ([clave, valor], i) => `
                <li id="resultado-obtenido-${index}-${i}">
                  <span class="resultado-clave">${clave}</span>: <span class="resultado-valor">${valor}</span>
                  <input type="checkbox" id="check-${index}-${i}" data-id="${index}" />
                </li>`,
            )
            .join("")}
          </ul>         
          <button onclick="calcularPorcentaje(${index})">Calcular Porcentaje</button>
          <p id="resultado-${index}"></p>

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
        document.getElementById("pruebas-container").innerHTML =
          `<p>Error al cargar las pruebas: ${error.message}</p>`;
      });
  }
});

function renderKeyValueList(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join("");
}

function createJSONFromText(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const result = {};
  lines.forEach((line, index) => {
    result[`item_${index + 1}`] = line;
  });

  return result;
}

function calcularPorcentaje(index) {
  const checkboxes = document.querySelectorAll(`[data-id="${index}"]`);

  const totalResultados = checkboxes.length;

  const seleccionados = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked,
  ).length;

  const porcentaje = (seleccionados / totalResultados) * 100;

  const resultadoElement = document.getElementById(`resultado-${index}`);
  resultadoElement.textContent =
    porcentaje >= 70
      ? `La prueba es válida (${porcentaje.toFixed(2)}%)`
      : `La prueba no es válida (${porcentaje.toFixed(2)}%)`;
}
