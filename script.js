// ============================================
// CONFIGURACIÓN - REEMPLAZA ESTA URL CON LA TUYA
// ============================================
const GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQzTWnqkbDvsrAbU8PxmjIIXnNG9IukKe2fUR_Cj1l5hDhCM013YErk27n-BucRezIDzEsNBhxiHYI9/pub?output=csv';

const UPDATE_INTERVAL = 5000;

// ============================================
// CÓDIGO PRINCIPAL
// ============================================

async function fetchData() {
  try {
    // Anti-caché (clave en GitHub Pages / OBS)
    const url = `${GOOGLE_SHEET_URL}&t=${Date.now()}`;

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    // ✅ CSV => texto
    const csvText = await response.text();

    // Convertir CSV a "rows" (array de arrays)
    const rows = parseCSV(csvText);

    // rows[0] = headers, rows[1..] = data
    if (rows && rows.length > 1) {
      updateOverlay(rows);
    }
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

// --- CSV Parser simple (soporta comillas) ---
function parseCSV(csvText) {
  // Limpia líneas vacías
  const lines = csvText
    .replace(/\r/g, '')
    .split('\n')
    .filter(line => line.trim() !== '');

  return lines.map(splitCSVLine);
}

function splitCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      // "" dentro de comillas => "
      current += '"';
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
}

function updateOverlay(rows) {
  let totalDeaths = 0;

  // Empezamos desde índice 1 para saltar los headers
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const game = (row[0] || '').trim().toLowerCase(); // warzone, pubg, free fire, fortnite, deaths
    const isActive = String(row[1] || '').trim().toUpperCase() === 'TRUE';
    const count = parseInt(row[2], 10) || 0;

    if (game === 'deaths') {
      totalDeaths = count;
    } else {
      // Si tu sheet pone "Free Fire", tu HTML probablemente usa "freefire"
      // Normaliza por si acaso:
      const gameKey = game.replace(/\s+/g, ''); // "free fire" -> "freefire"

      const countElement = document.getElementById(`${gameKey}-count`);
      if (countElement) countElement.textContent = count;

      const gameItem = document.querySelector(`[data-game="${gameKey}"]`);
      if (gameItem) {
        if (isActive) gameItem.classList.add('active');
        else gameItem.classList.remove('active');
      }
    }
  }

  const deathsElement = document.getElementById('total-deaths');
  if (deathsElement) deathsElement.textContent = totalDeaths;
}

// Iniciar actualización automática
function startAutoUpdate() {
  fetchData(); // Primera carga inmediata
  setInterval(fetchData, UPDATE_INTERVAL);
}

document.addEventListener('DOMContentLoaded', startAutoUpdate);
