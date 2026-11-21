# Plan de trabajo de AutoFacture

**Sebastián Alejandro Blanco Ytriago**, ficha 3336064. Tecnólogo en Análisis y Desarrollo de Software del Servicio Nacional de Aprendizaje (SENA). Instructor Mauricio Fernández. Elaborado el 21 de noviembre de 2026 en Colombia.

## Objetivo

Organizar y verificar la continuidad de AutoFacture en un repositorio público independiente, con un historial reproducible y una demostración web de recepción, revisión, asignación y seguimiento interno de facturas.

## Alcance

AutoFacture conserva las quince pantallas P01 a P15 y el recorrido de GA6. El último commit de la entrega previa sirvió de base para GA7 y sigue disponible en el repositorio de GA6.

- **Recepción y revisión.** AUXR registra facturas identificables, revisa sus datos, conserva incidencias y puede corregir una versión. La corrección invalida la revisión anterior. La versión vigente exige su propia revisión para avanzar.
- **Asignación y trámite.** AUXR asigna facturas revisadas y documenta los motivos de asignación manual. AUXR autorizado configura las reglas. La menor prioridad numérica gana y los empates pasan a selección manual. RESP tramita sus facturas. CODA consulta y supervisa.
- **Seguimiento.** Bandeja, alertas, historial, panel y reportes parten del mismo conjunto local de datos. El CSV corresponde a las filas filtradas. Los estados son Recibida, Pendiente de corrección, Rechazada preliminarmente, Asignada, En trámite y Cerrada. Validada es un resultado de revisión.

La etapa trabaja con datos ficticios y almacenamiento del navegador. La autenticación real, la gestión multiusuario, la auditoría de servidor, DIAN, FACTURE, SAP, Supabase, el pago, la contabilización y las exportaciones de producto a Excel/PDF quedan fuera del alcance implementado. La demostración parte de tres facturas por COP 2.023.000. INC-DEMO-104 se muestra como incidencia separada por COP 357.000, sin responsable ni NIT inventado. El corte ficticio sigue siendo el 9 de noviembre de 2026 a las 5:00 p. m. en Colombia.

## Requisitos y prioridades

Se conservan RF01 a RF25, RF-UI01 y las historias HU-001 a HU-008 de GA6. La tabla resume la trazabilidad de los requisitos funcionales. Los detalles y límites por requisito están en [requisitos de GA6](../ga6/docs/requisitos.md) e [historias de usuario](../ga6/docs/historias.md).

| Código | Tema | Historia | Prioridad |
| --- | --- | --- | --- |
| RF01 | Captura condicionada desde FACTURE | HU-001 | Alta |
| RF02 | Revisión interna de datos | HU-002 | Alta |
| RF03 | Revisión de impuestos con reglas aprobadas | HU-002 | Alta |
| RF04 | Alertas de inconsistencias | HU-002 | Alta |
| RF05 | Rechazo preliminar interno | HU-002 | Alta |
| RF06 | Registro desde archivo | HU-001 | Alta |
| RF07 | Consecutivo interno | HU-001 | Media |
| RF08 | Fechas informadas | HU-001 | Alta |
| RF09 | Orden de compra | HU-001 | Media |
| RF10 | Estado Recibida | HU-001 | Alta |
| RF11 | Responsable por proveedor | HU-003 y HU-007 | Alta |
| RF12 | Asignación por OC, área o servicio | HU-003 y HU-007 | Alta |
| RF13 | Configuración de reglas | HU-007 | Alta |
| RF14 | Fecha y resultado de asignación | HU-003 | Alta |
| RF15 | Estados del trámite | HU-004 | Alta |
| RF16 | Tiempos transcurridos | HU-005 | Media |
| RF17 | Vencimientos y alertas | HU-005 | Alta |
| RF18 | Demoras según umbral | HU-005 | Alta |
| RF19 | Historial de operaciones | HU-002, HU-003, HU-004, HU-005 y HU-007 | Alta |
| RF20 | Auditoría de eventos | HU-002, HU-003, HU-004 y HU-007 | Alta |
| RF21 | Reportes con filtros | HU-006 | Media |
| RF22 | Exportación de reportes | HU-006 | Media |
| RF23 | Panel de indicadores | HU-006 | Alta |
| RF24 | Sincronización condicionada con FACTURE | HU-001 | Alta |
| RF25 | Preparación de una integración ERP | Sin HU asignada | Media |
| RF-UI01 | Acceso interno de demostración | HU-008 | Alta |

En esta demostración RF22 cubre CSV. RF18 depende de un umbral definido y RF01, RF24 y RF25 conservan sus límites de integración. Las prioridades de la siguiente tabla son decisiones de trabajo para GA7. La documentación previa identifica los RNF por código y tema.

| Código | Tema | Prioridad de trabajo | Aplicación verificable |
| --- | --- | --- | --- |
| RNF01 | Usabilidad | Alta | Controles con foco visible y disposición adaptable. |
| RNF02 | Mensajes claros | Alta | Errores y orientaciones asociados a cada campo. |
| RNF03 | Navegación | Alta | Menú consistente y opciones de regreso al origen. |
| RNF04 | Autenticación | Alta | Identidad de demostración delimitada mediante RF-UI01. |
| RNF05 | Permisos | Alta | Acciones diferenciadas para AUXR, RESP y CODA. |
| RNF06 | Auditoría | Media | Historial de eventos locales para revisar el trámite. |
| RNF12 | Mantenibilidad | Alta | Plantilla reutilizable y una hoja de estilos activa en GA6. |
| RNF15 | Duplicados | Alta | Validación de emisor y número antes de registrar. |

## Cronograma

| Semana de trabajo | Fase | Entregable verificable |
| --- | --- | --- |
| 11 al 17 de octubre de 2026 | Maqueta GA5 | Seis interfaces iniciales y verificador de anchos. Historial desde `b6eea38` hasta `c791e5e`. |
| 9 al 15 de noviembre de 2026 | Frontend GA6 | Quince interfaces, reglas locales y documentación cerrada el 10 de noviembre. Línea base `2cbba33`. |
| 16 al 22 de noviembre de 2026 | Control de versiones GA7 | Repositorio independiente, estándares, pruebas recuperadas, revisión por PR y versión identificada con etiqueta. |
| 23 al 29 de noviembre de 2026 | Continuidad prevista | Recibir cambios mediante issues y usar el repositorio nuevo como base de etapas posteriores. |

Las fechas de GA5 y GA6 se tomaron del historial importado. La última fila corresponde a una previsión de trabajo, sin plazo académico asignado.

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
| --- | --- | --- | --- |
| Cambiar el repositorio de GA6 que sigue en evaluación | Media | Alto | Clonar la línea base y usar el repositorio GA7 como único destino de publicación. Verificar `git remote -v` antes del primer envío. |
| Romper enlaces o persistencia local al cambiar la URL | Media | Alto | Servir GA6 por HTTP o HTTPS en un solo origen. Comprobar las rutas estáticas y abrir la demostración publicada. |
| Mostrar una fase de trámite distinta tras corregir una factura | Media | Alto | Ejecutar las pruebas de lógica y DOM simulado, incluida la revisión vigente y la conservación de versiones. |

## Herramientas

La demostración usa HTML5, CSS3 y JavaScript sin frameworks. `localStorage` guarda los datos ficticios y `sessionStorage` conserva la identidad de la sesión en ese navegador. Git para Windows registra el trabajo desde PowerShell. GitHub permite seguir los issues, revisar el PR y publicar la versión. Python y Node.js se usan al ejecutar las tres comprobaciones de GA6 y quedan separados de los requisitos de la aplicación.

## Criterios de aceptación y anexos

- Conservar como ancestro el último commit de GA6 y comprobar que el repositorio anterior siga disponible.
- Abrir la demostración por HTTPS, consultar la bandeja con las tres facturas y distinguir INC-DEMO-104 del total registrado.
- Ejecutar las tres pruebas desde `ga6/` y documentar sus resultados reales con sus respectivos métodos.
- Entregar el [repositorio público de GA7](https://github.com/sebastianblancoay-hash/autofacture-ga7), un PR revisado y fusionado, y una release cuyo tag señale el commit evaluado.
- Mantener accesibles [los estándares de codificación](estandares-de-codificacion.md), la [comparación de herramientas](herramientas-de-versionamiento.md) y la [guía de ejecución](../README.md).
