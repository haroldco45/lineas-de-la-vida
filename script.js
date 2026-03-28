const motorIA = {
    criticar: "IA Vibras: ¿Esta crítica te ayuda a crecer o solo libera negatividad?",
    chismear: "IA Vibras: Lo que dices de otros revela tu propio estado interno.",
    involucrarse: "IA Vibras: Involucrarte es el primer paso para el cambio real.",
    alentar: "¡Gracias! Tu luz acaba de iluminar el día de alguien más.",
    ayudar: "Vibras Positivas: La ayuda generosa es la semilla de la abundancia."
};

function togglePanel() {
    const panel = document.getElementById('panelActivo');
    panel.classList.toggle('activo');
}

function registrar(tipo) {
    const mensaje = prompt(`[Puerta ${tipo.toUpperCase()}] ¿Qué quieres registrar hoy?`);
    if (!mensaje) return;

    const respuestaIA = motorIA[tipo.toLowerCase()] || "Sigue vibrando alto.";
    
    const accion = {
        fecha: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        tipo: tipo,
        detalle: mensaje,
        ia: respuestaIA
    };

    // Guardar
    let historial = JSON.parse(localStorage.getItem('vibras_pro')) || [];
    historial.push(accion);
    localStorage.setItem('vibras_pro', JSON.stringify(historial));

    actualizarLista();
    
    // Abrir el panel automáticamente para mostrar el registro
    const panel = document.getElementById('panelActivo');
    if (!panel.classList.contains('activo')) {
        togglePanel();
    }
}

function actualizarLista() {
    const lista = document.getElementById('lista-acciones');
    const historial = JSON.parse(localStorage.getItem('vibras_pro')) || [];
    lista.innerHTML = "";

    historial.reverse().slice(0, 10).forEach(a => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="color:var(--oro); font-weight:bold;">[${a.tipo}]</span> 
            <small>${a.fecha}</small><br>
            "${a.detalle}"<br>
            <em style="color:#2a5a8a; font-size:0.8rem;">✨ ${a.ia}</em>
        `;
        lista.appendChild(li);
    });
}

// Inicializar lista al cargar
document.addEventListener('DOMContentLoaded', actualizarLista);
