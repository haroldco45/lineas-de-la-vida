const motorIA = {
    criticar: "IA Vibras: ¿Esta crítica te ayuda a crecer o solo libera negatividad?",
    chismear: "IA Vibras: Lo que dices de otros revela tu propio estado interno.",
    involucrarse: "IA Vibras: Involucrarte es el primer paso para el cambio real.",
    alentar: "¡Gracias! Tu luz acaba de iluminar el día de alguien más.",
    ayudar: "Vibras Positivas: La ayuda generosa es la semilla de la abundancia."
};

// Función para abrir y cerrar el panel con suavidad
function togglePanel() {
    const panel = document.getElementById('panelActivo');
    if (panel) {
        panel.classList.toggle('activo');
    }
}

// Función principal de registro
function registrar(tipo) {
    const mensaje = prompt(`[Puerta ${tipo.toUpperCase()}] ¿Qué quieres registrar hoy?`);
    
    // Si el usuario cancela o deja vacío, no hacemos nada
    if (!mensaje || mensaje.trim() === "") return;

    // Normalizamos el tipo para buscar en el motor de IA
    const tipoNormalizado = tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const respuestaIA = motorIA[tipoNormalizado] || "Sigue vibrando alto con Vibras Positivas.";
    
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

    // Actualizar la interfaz
    actualizarLista();
    
    // Abrir el panel automáticamente para mostrar el registro si está cerrado
    const panel = document.getElementById('panelActivo');
    if (panel && !panel.classList.contains('activo')) {
        panel.classList.add('activo');
    }
}

// Renderizar la lista de acciones en el panel
function actualizarLista() {
    const lista = document.getElementById('lista-acciones');
    if (!lista) return;

    const historial = JSON.parse(localStorage.getItem('vibras_pro')) || [];
    lista.innerHTML = "";

    // Mostramos los últimos 10 registros, del más reciente al más antiguo
    [...historial].reverse().slice(0, 10).forEach(a => {
        const li = document.createElement('li');
        li.style.marginBottom = "15px";
        li.style.borderBottom = "1px solid rgba(0,0,0,0.1)";
        li.style.paddingBottom = "10px";
        
        li.innerHTML = `
            <span style="color:#c5a059; font-weight:bold; text-transform:uppercase; font-size:0.75rem;">[${a.tipo}]</span> 
            <small style="color:#888;">${a.fecha}</small><br>
            <div style="margin: 5px 0; color:#444; font-style:italic;">"${a.detalle}"</div>
            <div style="color:#2a5a8a; font-size:0.85rem; font-weight:500;">✨ ${a.ia}</div>
        `;
        lista.appendChild(li);
    });
}

// Inicialización y eventos de cierre
document.addEventListener('DOMContentLoaded', () => {
    actualizarLista();

    // CERRAR AL TOCAR FUERA: Si tocan el escenario de las puertas, el panel se guarda
    const escenario = document.getElementById('escenarioTemplo');
    if (escenario) {
        escenario.addEventListener('click', (e) => {
            const panel = document.getElementById('panelActivo');
            // Solo cerramos si el clic fue directamente en el escenario, no en sus hijos
            if (e.target === escenario && panel.classList.contains('activo')) {
                panel.classList.remove('activo');
            }
        });
    }
});
