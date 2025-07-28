document.addEventListener("DOMContentLoaded", function () {
    const ramos = document.querySelectorAll('.ramo');
    const aprobadoClass = 'aprobado';

    // Mapea todos los cursos por su nombre
    const mapaRamos = {};
    ramos.forEach(ramo => {
        const nombre = ramo.dataset.nombre.trim();
        mapaRamos[nombre] = ramo;
    });

    // Evento de clic en cada ramo
    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            ramo.classList.toggle(aprobadoClass);
            actualizarDisponibles();
        });
    });

    function actualizarDisponibles() {
        ramos.forEach(ramo => {
            const prerequisitos = ramo.dataset.abre?.split(',').map(p => p.trim()) || [];

            // Verifica si todos los prerequisitos están aprobados
            const desbloqueado = prerequisitos.every(nombre => {
                const prereq = mapaRamos[nombre];
                return prereq && prereq.classList.contains(aprobadoClass);
            });

            // Solo habilita si todos los requisitos están aprobados
            if (prerequisitos.length > 0) {
                ramo.classList.toggle('desbloqueado', desbloqueado);
            }
        });
    }
});
