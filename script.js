document.addEventListener("DOMContentLoaded", function () {
  const cursos = document.querySelectorAll(".ramo");
  const aprobados = new Set(JSON.parse(localStorage.getItem("cursosAprobados") || "[]"));

  function guardarEstado() {
    localStorage.setItem("cursosAprobados", JSON.stringify(Array.from(aprobados)));
  }

  function actualizarCursos() {
    cursos.forEach((curso) => {
      const nombre = curso.dataset.nombre.trim();
      const requisitos = curso.dataset.requiere
        ? curso.dataset.requiere.split(",").map(r => r.trim())
        : [];

      const desbloqueado = requisitos.length === 0 || requisitos.every(req => aprobados.has(req));

      curso.classList.toggle("bloqueado", !desbloqueado);
      curso.classList.toggle("desbloqueado", desbloqueado);
      curso.classList.toggle("aprobado", aprobados.has(nombre));
    });
  }

  cursos.forEach((curso) => {
    curso.addEventListener("click", () => {
      const nombre = curso.dataset.nombre.trim();
      const requisitos = curso.dataset.requiere
        ? curso.dataset.requiere.split(",").map(r => r.trim())
        : [];

      const desbloqueado = requisitos.length === 0 || requisitos.every(req => aprobados.has(req));

      if (!desbloqueado) {
        alert(`Para aprobar "${nombre}", debes primero aprobar:\n${requisitos.join(", ")}`);
        return;
      }

      if (aprobados.has(nombre)) {
        aprobados.delete(nombre);
      } else {
        aprobados.add(nombre);
      }

      guardarEstado();
      actualizarCursos();
    });
  });

  actualizarCursos();
});
