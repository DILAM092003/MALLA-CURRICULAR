// script.js

const estructuraCiclos = {
  "Primer Ciclo": [
    "Lenguaje",
    "Métodos De Estudio Universitario",
    "Gestión Personal",
    "Calculo I",
    "Matemática Básica",
    "Biología"
  ],
  "Segundo Ciclo": [
    "Fundamentos de Investigación Científica",
    "Medio Ambiente y Desarrollo Sostenible",
    "Realidad Nacional y Mundial",
    "Calculo II",
    "Química Inorgánica Y Orgánica",
    "Física General"
  ],
  "Tercer Ciclo": [
    "Estadística y Probabilidad",
    "Economía",
    "Calculo III",
    "Algebra Lineal",
    "Modelos Determinísticos en Investigación Operativa I"
  ],
  "Cuarto Ciclo": [
    "Programación de Computadoras",
    "IEDO",
    "Inferencia Estadística",
    "Programación Lineal y Entera"
  ],
  "Quinto Ciclo": [
    "Teoría, Análisis y diseño de sistemas",
    "Modelos Determinísticos en Investigación Operativa II",
    "Matemática Financiera",
    "Métodos Numéricos",
    "Practica pre profesional Módulo I"
  ],
  "Sexto Ciclo": [
    "Modelos Probabilísticos en Investigación Operativa I",
    "Procesos Estocásticos",
    "Gestión de Sistemas Organizacionales",
    "Seminario de Investigación I"
  ],
  "Séptimo Ciclo": [
    "Modelos Probabilísticos en Investigación Operativa II",
    "Simulación de sistemas",
    "Teoría de Grafos"
  ],
  "Octavo Ciclo": [
    "Heurística y Metaheurística",
    "Teoría de decisiones",
    "Programación no Lineal y Dinámica",
    "Seminario de Investigación II",
    "Practica pre profesional Módulo II"
  ],
  "Noveno Ciclo": [
    "Modelos Econométricos",
    "Seminario de Tesis de Investigación Operativa I",
    "Estudio de caso en Investigación Operativa",
    "Formulación y Gestión de Proyectos"
  ],
  "Décimo Ciclo": [
    "Series cronológicas",
    "Seminario de Tesis de Investigación Operativa II",
    "Practica pre profesional Módulo III"
  ]
};

const requisitos = /* los requisitos definidos previamente (omitidos aquí para brevedad) */;

const estadoRamos = {};

function crearRamo(nombre) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = nombre;
  div.onclick = () => {
    if (!div.classList.contains("bloqueado")) toggleRamo(nombre, div);
  };
  div.dataset.nombre = nombre;

  const span = document.createElement("div");
  span.className = "requisitos";
  span.textContent = "Requiere: " + (requisitos[nombre] || []).join(", ");
  div.appendChild(span);

  estadoRamos[nombre] = false;
  return div;
}

function toggleRamo(nombre, div) {
  if (estadoRamos[nombre]) return;
  estadoRamos[nombre] = true;
  div.classList.add("aprobado");
  div.classList.remove("bloqueado");
  actualizarBloqueos();
}

function actualizarBloqueos() {
  for (let ramo in requisitos) {
    const reqs = requisitos[ramo];
    const div = document.querySelector(`.ramo[data-nombre="${ramo}"]`);
    if (!reqs || reqs.length === 0) continue;

    const todosCumplidos = reqs.every(r => estadoRamos[r]);
    if (todosCumplidos) {
      div.classList.remove("bloqueado");
      div.classList.add("desbloqueado");
    } else {
      div.classList.add("bloqueado");
      div.classList.remove("desbloqueado");
    }
  }
}

function iniciarMalla() {
  const contenedor = document.getElementById("contenedor-malla");

  for (let ciclo in estructuraCiclos) {
    const wrapper = document.createElement("div");
    wrapper.className = "ciclo";
    const titulo = document.createElement("h2");
    titulo.textContent = ciclo;
    const grid = document.createElement("div");
    grid.className = "grid";

    estructuraCiclos[ciclo].forEach(nombre => {
      const ramo = crearRamo(nombre);
      grid.appendChild(ramo);
    });

    wrapper.appendChild(titulo);
    wrapper.appendChild(grid);
    contenedor.appendChild(wrapper);
  }

  actualizarBloqueos();
}

iniciarMalla();


