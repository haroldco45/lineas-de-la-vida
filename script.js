// Ejecutar al cargar la página para recuperar datos guardados
document.addEventListener('DOMContentLoaded', () => {
    cargarHistorial();
});

function registrar(tipo) {
    const mensaje = prompt(`Elegiste la puerta: ${tipo}. \n¿Qué acción o pensamiento tuviste?`);
    
    if (mensaje) {
        const ahora = new Date().toLocaleString();
        const nuevaAccion = {
            fecha: ahora,
            puerta: tipo,
            detalle: mensaje
        };

        // 1. Obtener lo que ya existe en LocalStorage o crear un array vacío
        let historial = JSON.parse(localStorage.getItem('historialLineasVida')) || [];

        // 2. Agregar la nueva acción
        historial.push(nuevaAccion);

        // 3. Guardar de nuevo en LocalStorage
        localStorage.setItem('historialLineasVida', JSON.stringify(historial));

        // 4. Actualizar la vista
        mostrarEnPantalla(nuevaAccion);
        alert("Tu elección ha sido guardada permanentemente en este navegador.");
    }
}

function mostrarEnPantalla(accion) {
    const lista = document.getElementById('lista-acciones');
    const li = document.createElement('li');
    li.style.padding = "10px";
    li.style.borderBottom = "1px solid #ddd";
    li.innerHTML = `<strong>${accion.fecha}</strong> - <span class="badge">${accion.puerta}</span>: ${accion.detalle}`;
    lista.prepend(li);
}

function cargarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historialLineasVida')) || [];
    historial.forEach(accion => {
        mostrarEnPantalla(accion);
    });
}
