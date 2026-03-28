const motorIA = {
    criticar: "Reflexión IA: ¿Esta crítica ayuda a construir o solo libera tensión negativa?",
    chismear: "Reflexión IA: Recuerda que lo que decimos de otros habla más de nosotros mismos.",
    alentar: "¡Excelente! Has encendido una luz en el camino de alguien.",
    ayudar: "Vibras Positivas: La ayuda desinteresada es la base de una vida plena."
};

function registrar(tipo) {
    const mensaje = prompt(`[Puerta ${tipo}] ¿Qué pasó hoy?`);
    if (!mensaje) return;

    const respuestaIA = motorIA[tipo.toLowerCase()] || "Sigue vibrando alto.";
    
    // Crear objeto de acción
    const accion = {
        fecha: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        tipo: tipo,
        detalle: mensaje,
        ia: respuestaIA
    };

    // Guardar en LocalStorage
    let historial = JSON.parse(localStorage.getItem('vibras_pro')) || [];
    historial.push(accion);
    localStorage.setItem('vibras_pro', JSON.stringify(historial));

    actualizarLista();
    alert(`🤖 IA Vibras Positivas dice: ${respuestaIA}`);
}

function actualizarLista() {
    const lista = document.getElementById('lista-acciones');
    const historial = JSON.parse(localStorage.getItem('vibras_pro')) || [];
    lista.innerHTML = "";

    historial.reverse().slice(0, 5).forEach(a => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${a.fecha} - ${a.tipo}:</strong> ${a.detalle}<br><small style="color:var(--oro)">${a.ia}</small>`;
        lista.appendChild(li);
    });
}

// Cargar al inicio
document.addEventListener('DOMContentLoaded', actualizarLista);
