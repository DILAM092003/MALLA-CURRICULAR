const ramos = {
  "Lenguaje": [],
  "Métodos De Estudio Universitario": [],
  "Gestión Personal": [],
  "Calculo I": ["Calculo II", "Modelos Determinísticos en Investigación Operativa I"],
  "Matemática Básica": ["Estadística y Probabilidad", "Algebra Lineal"],
  "Biología": ["Medio Ambiente y Desarrollo Sostenible"],
  "Fundamentos de Investigación Científica": [],
  "Medio Ambiente y Desarrollo Sostenible": ["Economía"],
  "Realidad Nacional y Mundial": ["Economía"],
  "Calculo II": ["Calculo III", "Estadística y Probabilidad", "Métodos Numéricos"],
  "Química Inorgánica Y Orgánica": [],
  "Física General": [],
  "Estadística y Probabilidad": ["Inferencia Estadística", "Modelos Probabilísticos en Investigación Operativa I", "Procesos Estocásticos"],
  "Economía": ["Matemática Financiera", "Modelos Econométricos"],
  "Calculo III": ["IEDO", "Programación no Lineal y Dinámica"],
  "Algebra Lineal": ["IEDO", "Programación Lineal y Entera", "Matemática Financiera", "Métodos Numéricos"],
  "Modelos Determinísticos en Investigación Operativa I": [
    "Programación de Computadoras",
    "Teoría, Análisis y diseño de sistemas",
    "Modelos Determinísticos en Investigación Operativa II",
    "Practica pre profesional Módulo I",
    "Modelos Probabilísticos en Investigación Operativa I"
  ],
  "Programación de Computadoras": ["Métodos Numéricos", "Practica pre profesional Módulo I", "Heurística y Metaheurística"],
  "IEDO": ["Procesos Estocásticos"],
  "Inferencia Estadística": ["Simulación de sistemas", "Teoría de decisiones", "Modelos Econométricos"],
  "Programación Lineal y Entera": [
    "Modelos Determinísticos en Investigación Operativa II",
    "Matemática Financiera",
    "Practica pre profesional Módulo I",
    "Teoría de Grafos",
    "Programación no Lineal y Dinámica"
  ],
  "Teoría, Análisis y diseño de sistemas": ["Gestión de Sistemas Organizacionales"],
  "Modelos Determinísticos en Investigación Operativa II": ["Seminario de Investigación I"],
  "Matemática Financiera": ["Teoría de decisiones", "Modelos Econométricos", "Formulación y Gestión de Proyectos"],
  "Métodos Numéricos": ["Programación no Lineal y Dinámica"],
  "Practica pre profesional Módulo I": ["Practica pre profesional Módulo II"],
  "Modelos Probabilísticos en Investigación Operativa I": ["Modelos Probabilísticos en Investigación Operativa II", "Simulación de sistemas"],
  "Procesos Estocásticos": ["Simulación de sistemas"],
  "Gestión de Sistemas Organizacionales": ["Formulación y Gestión de Proyectos"],
  "Seminario de Investigación I": ["Seminario de Investigación II"],
  "Modelos Probabilísticos en Investigación Operativa II": ["Practica pre profesional Módulo II"],
  "Simulación de sistemas": [
    "Practica pre profesional Módulo II",
    "Seminario de Tesis de Investigación Operativa I",
    "Estudio de caso en Investigación Operativa"
  ],
  "Teoría de Grafos": [
    "Heurística y Metaheurística",
    "Practica pre profesional Módulo II",
    "Seminario de Tesis de Investigación Operativa I",
    "Estudio de caso en Investigación Operativa"
  ],
  "Heurística y Metaheurística": ["Estudio de caso en Investigación Operativa"],
  "Teoría de decisiones": ["Seminario de Tesis de Investigación Operativa I", "Estudio de caso en Investigación Operativa"],
  "Programación no Lineal y Dinámica": ["Seminario de Tesis de Investigación Operativa I", "Estudio de caso en Investigación Operativa"],
  "Seminario de Investigación II": ["Seminario de Tesis de Investigación Operativa I"],
  "Practica pre profesional Módulo II": ["Practica pre profesional Módulo III"],
  "Modelos Econométricos": ["Series cronológicas"],
  "Seminario de Tesis de Investigación Operativa I": ["Seminario de Tesis de Investigación Operativa II"],
  "Series cronológicas": [],
  "Seminario de Tesis de Investigación Operativa II": [],
  "Estudio de caso en Investigación Operativa": [],
  "Formulación y Gestión de Proyectos": [],
  "Practica pre profesional Módulo III": []
};

const malla = document.getElementById('malla');
const estadoRamos = {};

function crearRamo(nombre) {
  const div = document.createElement('div');
  div.className = 'ramo';
  div.textContent = nombre;
  div.onclick = () => toggleRamo(nombre, div);
  div.dataset.nombre = nombre;
  estadoRamos[nombre] = false;
  return div;
}

function toggleRamo(nombre, div) {
  if (estadoRamos[nombre]) return;
  estadoRamos[nombre] = true;
  div.classList.add('aprobado');
  desbloquear(nombre);
}

function desbloquear(nombre) {
  for (let ramo in ramos) {
    const requisitos = ramos[ramo];
    if (requisitos.includes(nombre)) {
      if (requisitos.every(req => estadoRamos[req])) {
        const divs = document.querySelectorAll(`.ramo[data-nombre="${ramo}"]`);
        divs.forEach(d => d.classList.add('desbloqueado'));
      }
    }
  }
}

function iniciarMalla() {
  for (let nombre in ramos) {
    const div = crearRamo(nombre);
    malla.appendChild(div);
  }
}

iniciarMalla();

