// --- MOTOR DE IA DE VIBRAS POSITIVAS ---
const respuestasIA = {
    criticar: [
        "IA Reflexiva: ¿Esta crítica construye algo en ti o solo drena tu energía?",
        "IA Reflexiva: Recuerda que lo que ves en otros es a menudo un espejo de lo que debemos sanar.",
        "IA Reflexiva: ¿Cómo podrías transformar esta queja en una petición amable?",
        "IA Reflexiva: Antes de juzgar, intenta comprender la batalla que el otro está librando."
    ],
    chismear: [
        "IA Reflexiva: Las palabras son semillas. ¿Qué estás sembrando hoy en tu entorno?",
        "IA Reflexiva: Si no es verdad, bueno o útil, ¿realmente vale la pena repetirlo?",
        "IA Reflexiva: El chisme se detiene cuando llega al oído de alguien sabio.",
        "IA Reflexiva: Eleva tu conversación. Habla de ideas y sueños, no de personas."
    ],
    alentar: ["¡Gracias por ser luz! Tu palabra de aliento puede cambiarle el día a alguien."],
    ayudar: ["Acción impecable. Ayudar es la forma más alta de Vibras Positivas."]
};

async function registrar(tipo) {
    const mensaje = prompt(`[Puerta: ${tipo}]\n¿Qué sucedió o qué pensaste?`);
    
    if (mensaje) {
        let mensajeConIA = mensaje;

        // --- LÓGICA DE INTERVENCIÓN DE LA IA ---
        if (tipo === 'Criticar' || tipo === 'Chismear') {
            const categoria = tipo.toLowerCase();
            const frases = respuestasIA[categoria];
            const sugerenciaIA = frases[Math.floor(Math.random() * frases.length)];
            
            // La IA añade su granito de arena automáticamente
            mensajeConIA = `${mensaje} \n\n✨ ${sugerenciaIA}`;
            
            alert(`🤖 La IA de Vibras Positivas ha analizado tu entrada y añadió una reflexión a tu diario.`);
        }

        const ahora = new Date().toLocaleString([], { day:'2-digit', month:'2-digit', hour: '2-digit', minute:'2-digit' });
        const accion = { fecha: ahora, puerta: tipo, detalle: mensajeConIA };

        // Guardar en LocalStorage
        let historial = JSON.parse(localStorage.getItem('vibras_history')) || [];
        historial.push(accion);
        localStorage.setItem('vibras_history', JSON.stringify(historial));
        
        // Refrescar la pantalla para ver el cambio
        location.reload(); 
    }
}
