document.addEventListener("DOMContentLoaded", function () {
  const cursos = document.querySelectorAll(".ramo");
  const aprobados = new Set(JSON.parse(localStorage.getItem("cursosAprobados") || "[]"));

  function guardarEstado() {
    localStorage.setItem("cursosAprobados", JSON.stringify(Array.from(aprobados)));
  }

  function actualizarCursos() {
    cursos.forEach((curso) => {
      const nombre = curso.dataset.nombre;
      const requisitos = curso.dataset.requiere
        ? curso.dataset.requiere.split(",").map(r => r.trim())
        : [];

      const desbloqueado = requisitos.length === 0 || requisitos.every(r => aprobados.has(r));
      curso.classList.toggle("bloqueado", !desbloqueado);
      curso.classList.toggle("desbloqueado", desbloqueado);

      curso.textContent = nombre;

      if (aprobados.has(nombre)) {
        curso.classList.add("aprobado");
      } else {
        curso.classList.remove("aprobado");
      }
    });
  }

  cursos.forEach((curso) => {
    curso.addEventListener("click", () => {
      const nombre = curso.dataset.nombre;
      const requisitos = curso.dataset.requiere
        ? curso.dataset.requiere.split(",").map(r => r.trim())
        : [];
      const desbloqueado = requisitos.length === 0 || requisitos.every(r => aprobados.has(r));

      if (desbloqueado) {
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
