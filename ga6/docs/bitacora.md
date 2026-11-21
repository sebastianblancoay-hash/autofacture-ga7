# Bitácora de decisiones de AutoFacture

Sebastián Alejandro Blanco Ytriago. ADSO, ficha 3336064.

Revisión por etapas del 10 de noviembre de 2026, Colombia.

Las entradas registran las decisiones de GA6, el método de comprobación y el resultado de cada revisión.

## Entrada 1 Historias y requisitos

Se mantuvieron RF01 a RF25 y las seis historias iniciales. El conjunto se completó con HU-007 y HU-008. AUXR recibe, revisa, asigna y consulta alertas. Solo AUXR autorizado configura RF13. RESP gestiona sus facturas y CODA consulta.

Los requisitos y las ocho historias registran los roles, las prioridades y las relaciones acordadas. RF24 sigue vinculado a HU-001 y RF25 queda como preparación futura.

Captura en el paquete de evidencias: revision_01.jpg

## Entrada 2 Herramienta, mapa y prototipos

Se eligió el prototipo HTML porque permite recorrer AutoFacture y continuar la maqueta de GA5. Se conservó la comparación con Figma, el mapa editable y los quince bocetos enlazados. Sus pies identifican el proyecto y los datos ficticios.

La documentación distingue el escenario de los bocetos en octubre del corte del 9 de noviembre de la versión funcional.

Captura en el paquete de evidencias: revision_02.jpg

## Entrada 3 Componentes, plantilla y estilos

La demostración usa una sola hoja de estilos, una plantilla y un catálogo de componentes. Los colores del proyecto son azul, verde y blanco. Los filtros se distribuyen en una columna en celular y en dos o tres cuando el ancho lo permite.

La tabla de componentes se ajustó a las quince pantallas. Se revisaron cabecera, menú, formularios, errores junto al campo, foco, estados, tarjetas, tablas e historial.

Captura en el paquete de evidencias: revision_03.jpg

## Entrada 4 Comprobación funcional

Una revisión válida repetida de la misma versión conserva el estado En trámite. Una corrección con versión nueva, una revisión pendiente o una revisión rechazada impiden el avance. Se comprobaron también la importación, las versiones, las reglas por prioridad y el CSV filtrado.

Pasaron 105 comprobaciones de lógica, 31 combinaciones de pantalla e identidad y la comprobación estática de 33 HTML y 718 referencias locales. Se mantuvieron tres facturas por COP 2.023.000 y la incidencia 104 por COP 357.000 se registró por separado.

Capturas en el paquete de evidencias: revision_04_instruccion.jpg y revision_04.jpg

## Entrada 5 Fundamentos del frontend

La guía explica el uso de los elementos HTML, las variables de color, Grid, las consultas de medios, los eventos, el DOM, la validación y el foco. Una corrección conserva la versión anterior y exige una revisión nueva.

Se documentaron dieciséis fragmentos exactos de HTML, CSS y JavaScript del proyecto para explicar esas decisiones.

Captura en el paquete de evidencias: revision_05.jpg

## Entrada 6 Accesibilidad y cierre

Se revisaron las etiquetas, las ayudas y errores de cada campo, el foco visible, la navegación por teclado, el menú móvil y los filtros de una columna en ancho pequeño.

El análisis estático y las pruebas con DOM simulado verificaron etiquetas, ayudas, errores, solicitud de foco y reglas de diseño adaptable. La comprobación visual en navegador se describe en su registro. Se conservaron las quince pantallas, el código y los datos.

Captura en el paquete de evidencias: revision_06.jpg
