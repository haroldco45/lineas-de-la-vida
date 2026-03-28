// --- MOTOR DE IA DE VIBRAS POSITIVAS ---
const respuestasIA = {
    criticar: [
        "¿Esta crítica construye una mejor versión de ti o solo drena tu energía?",
        "Recuerda: lo que ves en otros es a menudo un espejo de lo que debemos sanar en nosotros.",
        "Transforma esta crítica en una petición amable. ¿Cómo podrías decir esto con amor?",
        "Antes de criticar, asegúrate de haber caminado un kilómetro en sus zapatos."
    ],
    chismear: [
        "Las palabras son semillas. ¿Qué estás sembrando hoy en el jardín de tu comunidad?",
        "Si no es verdad, si no es bueno y si no es útil... ¿realmente vale la pena contarlo?",
        "El chisme muere cuando llega al oído de una persona sabia. Sé tú ese final.",
        "Eleva la conversación. Habla de ideas y sueños, no de personas."
    ],
    alentar: [
        "¡Tu luz acaba de encender otra vela! Gracias por ser un motor de cambio.",
        "Una palabra de aliento puede cambiar el destino de alguien hoy.",
        "Eres un embajador de Vibras Positivas. ¡Sigue así!"
    ]
};

async function registrar(tipo) {
    const mensaje = prompt(`[Puerta: ${tipo}]\n¿Qué sucedió o qué pensaste?`);
    
    if (mensaje) {
        let mensajeFinal = mensaje;

        // --- INTERVENCIÓN DE LA IA ---
        if (tipo === 'Criticar' || tipo === 'Chismear') {
            const categoria = tipo.toLowerCase();
            const sugerencia = respuestasIA[categoria][Math.floor(Math.random() * respuestasIA[categoria].length)];
            
            const quiereTransformar = confirm(`🤖 IA VIBRAS POSITIVAS:\n\nHe analizado tu entrada. Antes de guardar, considera esto:\n"${sugerencia}"\n\n¿Deseas añadir esta reflexión a tu diario junto a tu mensaje?`);
            
            if (quiereTransformar) {
                mensajeFinal = `${mensaje} \n(Reflexión IA: ${sugerencia})`;
            }
        }

        const ahora = new Date().toLocaleString([], { day:'2-digit', month:'2-digit', hour: '2-digit', minute:'2-digit' });
        const accion = { fecha: ahora, puerta: tipo, detalle: mensajeFinal };

        // Guardar y Renderizar
        guardarLocal(accion);
        
        // Lógica de comunidad (se mantiene igual)
        if ((tipo === 'Alentar' || tipo === 'Ayudar') && typeof database !== 'undefined') {
            if (confirm("¿Quieres compartir esto anónimamente para inspirar a otros?")) {
                database.ref('muro-vibras').push({
                    puerta: tipo,
                    detalle: mensajeFinal,
                    timestamp: Date.now()
                });
            }
        }
    }
}
