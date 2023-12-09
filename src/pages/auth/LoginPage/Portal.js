// Portal.js
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const portalContainer = useRef(document.createElement('div'));
  const externalWindow = useRef(null);

  useEffect(() => {
    // Crea y abre una nueva ventana
    externalWindow.current = window.open(
      '', 
      '', 
      'width=600,height=400,left=200,top=200'
    );

    // Añade el contenedor al body de la nueva ventana
    externalWindow.current.document.body.appendChild(portalContainer.current);

    // Copia los estilos al documento de la nueva ventana
    copyStyles(document, externalWindow.current.document);

    // Retorna una función de limpieza que cierra la ventana emergente cuando el componente se desmonte
    return () => {
      externalWindow.current.close();
    };
  }, []);

  // El portal renderiza los children dentro del contenedor en la nueva ventana
  return ReactDOM.createPortal(children, portalContainer.current);
};

export default Portal;

function copyStyles(sourceDoc, targetDoc) {
    // Itera sobre todas las hojas de estilo del documento de origen
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
      // Si la hoja de estilo tiene una URL (es decir, es un archivo .css externo)
      if (styleSheet.href) {
        // Crea un nuevo elemento <link> para la hoja de estilo
        const newLinkEl = targetDoc.createElement('link');
        newLinkEl.rel = 'stylesheet';
        newLinkEl.href = styleSheet.href;
        targetDoc.head.appendChild(newLinkEl);
      } else {
        // Si la hoja de estilo es un elemento <style> en línea
        try {
          // Accede a las reglas CSS de la hoja de estilo
          if (styleSheet.cssRules) {
            // Crea un nuevo elemento <style>
            const newStyleEl = targetDoc.createElement('style');
            // Copia el contenido CSS de cada regla al nuevo elemento <style>
            Array.from(styleSheet.cssRules).forEach(cssRule => {
              newStyleEl.appendChild(targetDoc.createTextNode(cssRule.cssText));
            });
            // Añade el nuevo elemento <style> al <head> del documento de destino
            targetDoc.head.appendChild(newStyleEl);
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
}
