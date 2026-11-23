# Clon de SLOW Reciclaje Textil (https://www.slowreciclaje.com/)

Clon completo, responsivo y de alta fidelidad del sitio web de **SLOW Soluciones de Reciclaje Textil**.

---

## 📁 Estructura del Proyecto

```
slowreciclaje/
├── index.html            # Página principal completa con todas las secciones
├── styles.css            # Hoja de estilos consolidada y responsiva (fuentes, layouts, animaciones)
├── script.js             # Lógica interactiva (menú móvil, buscador, carrito, pestañas, scroll)
├── server.js             # Servidor HTTP local en Node.js (con soporte para streaming de video)
├── assets/
│   ├── images/           # 33 imágenes y logotipos descargados localmente (alta resolución)
│   └── videos/           # Videos descargados localmente (hero_video.mp4 y process_video.mp4)
└── subpages/             # 9 subpáginas completas vinculadas:
    ├── productos.html
    ├── objetos.html
    ├── mobiliario.html
    ├── revestimientos.html
    ├── a-la-medida.html
    ├── proyectos.html
    ├── materialidad.html
    ├── nosotros.html
    └── contacto.html
```

---

## 🚀 Cómo ejecutar localmente

Puedes servir el proyecto con cualquier servidor web o usar el script incluido en Node.js:

```bash
# Iniciar servidor local en el puerto 3000:
node server.js
```

Luego abre tu navegador en:
👉 **[http://localhost:3000/](http://localhost:3000/)**

También puedes abrir `index.html` directamente en tu navegador mediante doble clic o `file://`.

---

## ✨ Secciones y Funcionalidades Incluidas

1. **Header Sticky & Dinámico**:
   - Logotipo vectorizado de SLOW
   - Menú de navegación con desplegable ("Objetos", "Mobiliario", "Revestimientos", "A la medida")
   - Botón directo de "COTIZAR PROYECTO" (WhatsApp)
   - Panel deslizable de Búsqueda global en tiempo real (con filtrado instantáneo)
   - Contador de Carrito interactivo y Menú lateral (Drawer)
   - Menú móvil adaptable (Hamburguesa) con backdrop

2. **Hero Video**:
   - Video de fondo en bucle con overlay oscuro y tipografía editorial
   - Botones de acción ("VER COLECCIONES" y "COTIZAR PROYECTO")

3. **Líneas de Diseño**:
   - Tarjetas numeradas (01 Objetos decorativos, 02 Mobiliario, 03 Revestimientos)

4. **Piezas Regenerativas (Catálogo)**:
   - Cuadrícula de productos con cambio de imagen secundario al hacer hover
   - Precios en pesos colombianos ($ COP)
   - Botón interactivo "COMPRAR →" con apertura del carrito y alerta toast

5. **Soluciones a la Medida**:
   - Pestañas interactivas (Soluciones a la Medida, Línea B2B, Línea B2C)
   - Ficha técnica con pasos: Muestras, Prototipo, Producción nacional y Trazabilidad

6. **Marquesina Infinita & Manifiesto**:
   - Ticker animado continuo con conceptos clave
   - Declaración de marca de reciclaje textil y circularidad

7. **Concepto de Marca (Materialidad)**:
   - Bloques editoriales sobre Innovación Material y Pasaporte Digital

8. **Para Arquitectos, Diseñadores y Empresas**:
   - Servicios de especificación técnica, producción y desarrollos
   - Carrusel infinito con marcas aliadas (SURA, Miro Seguridad, Inexmoda, etc.)

9. **Del Material al Espacio**:
   - Video local del proceso de transformación artesanal y tecnológico

10. **Llamado a la Acción Final & Footer**:
    - Enlaces corporativos, tienda, contacto en Medellín y enlaces legales
    - Botón flotante de WhatsApp con enlace directo al canal de atención
