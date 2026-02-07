# Battle Royale Stream Overlay

Overlay para OBS que muestra partidas jugadas y muertes totales en tiempo real.

## 📋 Configuración Paso a Paso

### 1️⃣ Crear tu Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com) y crea una nueva hoja
2. Crea la siguiente estructura EXACTAMENTE así:

```
| Juego      | Activo | Partidas |
|------------|--------|----------|
| warzone    | FALSE  | 0        |
| pubg       | FALSE  | 0        |
| freefire   | FALSE  | 0        |
| fortnite   | TRUE   | 0        |
| deaths     | FALSE  | 0        |
```

**IMPORTANTE:** 
- La columna "Activo" usa TRUE/FALSE para indicar qué juego estás jugando
- La fila "deaths" es para el total de muertes (el contador rojo)
- Los nombres en la columna "Juego" DEBEN ser exactamente: warzone, pubg, freefire, fortnite, deaths

### 2️⃣ Publicar tu Google Sheet

1. En tu hoja de Google, ve a: **Archivo → Compartir → Publicar en la web**
2. En la primera lista desplegable selecciona: **Hoja 1** (o el nombre de tu hoja)
3. En la segunda lista desplegable selecciona: **Valores separados por comas (.csv)**
4. Haz clic en **Publicar**
5. Copia la URL que te da (algo como: https://docs.google.com/spreadsheets/d/e/...)

### 3️⃣ Configurar el Overlay

1. Abre el archivo `script.js`
2. Busca la línea que dice:
   ```javascript
   const GOOGLE_SHEET_URL = 'TU_URL_DE_GOOGLE_SHEETS_AQUI';
   ```
3. Reemplaza `'TU_URL_DE_GOOGLE_SHEETS_AQUI'` con tu URL, por ejemplo:
   ```javascript
   const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT.../pub?output=csv';
   ```

### 4️⃣ Subir a GitHub Pages

1. Ve a [GitHub](https://github.com) y crea una cuenta si no tienes
2. Crea un nuevo repositorio:
   - Haz clic en el botón verde "New" 
   - Nombre: `stream-overlay` (o el que prefieras)
   - Marca: ✅ Public
   - Haz clic en "Create repository"

3. Sube los archivos:
   - Haz clic en "uploading an existing file"
   - Arrastra TODOS estos archivos:
     - index.html
     - style.css
     - script.js
     - Call_of_Duty_Warzone_Black.svg
     - pubg-1-logo-svgrepo-com.svg
     - freefire-1.svg
     - FortniteLogo.svg
     - Noto_Emoji_v2_034_1f480_svg.png
   - Haz clic en "Commit changes"

4. Activar GitHub Pages:
   - Ve a Settings (Configuración)
   - En el menú lateral, busca "Pages"
   - En "Source" selecciona: **main** (o master)
   - Haz clic en "Save"
   - Espera 1-2 minutos

5. Tu overlay estará disponible en:
   ```
   https://TU-USUARIO.github.io/stream-overlay/
   ```

### 5️⃣ Agregar a OBS

1. Abre OBS Studio
2. En "Fuentes" haz clic en el **+**
3. Selecciona **"Navegador"**
4. Dale un nombre (ej: "Battle Royale Tracker")
5. En **URL** pega tu link de GitHub Pages
6. Configura:
   - Ancho: **1200**
   - Alto: **150**
   - ✅ Actualizar navegador cuando la escena se vuelve activa
7. Haz clic en **OK**

### 6️⃣ Ajustar posición en OBS

- Arrastra el overlay donde quieras en tu escena
- Redimensiona si es necesario
- Haz clic derecho → Transformar → Estirar para ajustar

## 🎮 Cómo Usar Durante el Stream

### En tu Google Sheet (puedes abrirla en el teléfono o segunda pantalla):

1. **Cambiar juego activo:** 
   - Pon `TRUE` en la fila del juego que estás jugando
   - Pon `FALSE` en los demás

2. **Actualizar partidas:**
   - Cambia el número en la columna "Partidas"

3. **Actualizar muertes totales:**
   - Cambia el número en la fila "deaths"

**Los cambios se reflejan en el overlay en 5 segundos automáticamente**

## 🎨 Personalización

### Cambiar velocidad de actualización:
En `script.js` cambia:
```javascript
const UPDATE_INTERVAL = 5000; // 5000 = 5 segundos
```

### Cambiar colores:
Edita `style.css` y modifica las propiedades de color

### Cambiar tamaño de logos:
En `style.css` busca `.game-logo` y cambia `height: 60px`

## ❓ Solución de Problemas

**Los números no se actualizan:**
- Verifica que la URL en `script.js` sea correcta
- Asegúrate que tu Google Sheet esté publicada en la web
- Revisa la consola del navegador (F12) para ver errores

**Los logos no aparecen:**
- Verifica que todos los archivos .svg y .png estén subidos a GitHub
- Los nombres de archivo deben ser exactos (mayúsculas/minúsculas)

**El overlay se ve diferente:**
- Ajusta el tamaño en OBS (ancho/alto)
- Revisa que estés usando un navegador actualizado

## 📧 Soporte

Si tienes problemas, revisa:
1. La consola del navegador (F12)
2. Que el formato de tu Google Sheet sea exacto
3. Que la URL esté correctamente configurada

---

¡Listo! Ahora tienes un overlay profesional para tus streams 🎮✨
<!-- test -->
