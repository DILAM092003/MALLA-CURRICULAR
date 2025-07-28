// script.js mejorado con soporte para tachado, orden por columnas y desbloqueo de cursos

document.addEventListener("DOMContentLoaded", function () {
  const cursos = document.querySelectorAll(".ramo");
  const aprobados = new Set(JSON.parse(localStorage.getItem("cursosAprobados") || "[]"));

  function guardarEstado() {
    localStorage.setItem("cursosAprobados", JSON.stringify(Array.from(aprobados)));
  }

  function actualizarCursos() {
    cursos.forEach((curso) => {
      const nombre = curso.getAttribute("data-nombre");
      if (aprobados.has(nombre)) {
        curso.classList.add("aprobado");
      } else {
        curso.classList.remove("aprobado");
      }

      const requisitos = curso.getAttribute("data-abre")?.split(",").map(r => r.trim()) || [];
      const desbloqueado = requisitos.every(r => aprobados.has(r));

      curso.classList.toggle("bloqueado", !desbloqueado && requisitos.length > 0);
      curso.classList.toggle("desbloqueado", desbloqueado || requisitos.length === 0);
    });
  }

  cursos.forEach((curso) => {
    curso.addEventListener("click", () => {
      const nombre = curso.getAttribute("data-nombre");

      if (!curso.classList.contains("bloqueado")) {
        if (aprobados.has(nombre)) {
          aprobados.delete(nombre);
        } else {
          aprobados.add(nombre);
        }
        guardarEstado();
        actualizarCursos();
      }
    });
  });

  actualizarCursos();
});
