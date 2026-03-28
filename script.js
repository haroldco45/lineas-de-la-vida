function registrar(tipo) {
    const mensaje = prompt(`Elegiste la puerta: ${tipo}. \n¿Qué acción o pensamiento tuviste?`);
    
    if (mensaje) {
        const lista = document.getElementById('lista-acciones');
        const nuevaAccion = document.createElement('li');
        
        // Formato: Hora - Tipo - Mensaje
        const ahora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        nuevaAccion.innerHTML = `<strong>${ahora} - ${tipo}:</strong> ${mensaje}`;
        
        lista.prepend(nuevaAccion);
        
        // Aquí podrías guardar en localStorage para que no se borre al recargar
        alert("Tu elección ha sido registrada en Las Líneas de la Vida.");
    }
}
