// ============================================
// CONFIGURACIÓN - REEMPLAZA ESTA URL CON LA TUYA
// ============================================
// Después de crear tu Google Sheet, copia aquí la URL de publicación
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQzTMngkbDvsrAbU8PxmjlIKnW69IuKko2fUR_Cjl16hDnCM013YEck27n-8ucRezIDzEsNBhxiHV19/pub?output=csv';

// Tiempo de actualización en milisegundos (5000 = 5 segundos)
const UPDATE_INTERVAL = 5000;

// ============================================
// CÓDIGO PRINCIPAL
// ============================================

async function fetchData() {
    try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const data = await response.json();
        
        // Los datos vienen en formato: data.values
        // Fila 1: Headers (Juego, Activo, Partidas)
        // Filas siguientes: datos de cada juego
        
        if (data.values && data.values.length > 1) {
            updateOverlay(data.values);
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

function updateOverlay(rows) {
    let totalDeaths = 0;
    
    // Empezamos desde índice 1 para saltar los headers
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const game = row[0]?.toLowerCase(); // warzone, pubg, freefire, fortnite, deaths
        const isActive = row[1]?.toUpperCase() === 'TRUE';
        const count = parseInt(row[2]) || 0;
        
        if (game === 'deaths') {
            totalDeaths = count;
        } else {
            // Actualizar contador del juego
            const countElement = document.getElementById(`${game}-count`);
            if (countElement) {
                countElement.textContent = count;
            }
            
            // Activar/desactivar el juego
            const gameItem = document.querySelector(`[data-game="${game}"]`);
            if (gameItem) {
                if (isActive) {
                    gameItem.classList.add('active');
                } else {
                    gameItem.classList.remove('active');
                }
            }
        }
    }
    
    // Actualizar contador de muertes totales
    const deathsElement = document.getElementById('total-deaths');
    if (deathsElement) {
        deathsElement.textContent = totalDeaths;
    }
}

// Iniciar actualización automática
function startAutoUpdate() {
    fetchData(); // Primera carga inmediata
    setInterval(fetchData, UPDATE_INTERVAL);
}

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', startAutoUpdate);
