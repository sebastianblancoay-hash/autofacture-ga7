# AutoFacture

AutoFacture es una demostración web del trámite interno de facturas. Permite registrar, revisar, asignar y seguir documentos ficticios mediante quince pantallas. Esta copia conserva el historial de GA5 y GA6 y reúne los cambios de versionamiento de GA7.

## Autoría

Sebastián Alejandro Blanco Ytriago · Ficha 3336064

Tecnólogo en Análisis y Desarrollo de Software · Servicio Nacional de Aprendizaje (SENA).

## Abrir la demostración

[AutoFacture en GitHub Pages](https://sebastianblancoay-hash.github.io/autofacture-ga7/ga6/) abre las pantallas funcionales. Las identidades disponibles son AUXR Demo, AUXR Autorizado Demo, Lina Demo, Pablo Demo y CODA Demo.

Para usar una copia local, ejecuta en PowerShell:

```powershell
git clone https://github.com/sebastianblancoay-hash/autofacture-ga7.git
Set-Location autofacture-ga7
python -m http.server 8000 --bind 127.0.0.1
```

Abre [127.0.0.1:8000/ga6/](http://127.0.0.1:8000/ga6/) y conserva esa dirección durante el recorrido. El navegador guarda los datos ficticios en `localStorage` y la identidad de demostración en `sessionStorage`. La aplicación usa HTML5, CSS3 y JavaScript puro. Python solo sirve los archivos durante la ejecución local.

El conjunto inicial muestra tres facturas por COP 2.023.000 y, en recepciones, la incidencia INC-DEMO-104 por COP 357.000. El manejo es local a ese navegador. Las identidades sirven para probar la interfaz y las restricciones del modelo.

## Etapas del proyecto

| Etapa | Enlace |
| --- | --- |
| GA5 | [Maqueta histórica en esta copia](https://sebastianblancoay-hash.github.io/autofacture-ga7/) y [documentación](LEEME.md). |
| GA6 | [Aplicación de quince interfaces](ga6/), [guía de uso](ga6/LEEME.md) y [verificación](ga6/docs/verificacion.md). |
| GA7 | [Plan, estándares y evidencias de versionamiento](ga7/README.md). |

El [repositorio anterior](https://github.com/sebastianblancoay-hash/autofacture-ga5) conserva la publicación usada para la entrega de GA6. El código, la rama de trabajo, las tareas y las versiones de esta etapa se consultan en el [repositorio de GA7](https://github.com/sebastianblancoay-hash/autofacture-ga7).

## Repetir las comprobaciones

Con Python y Node.js disponibles, cambia a `ga6/` dentro del clon y ejecuta:

```powershell
python -X utf8 pruebas/estatica.py
node pruebas/modelo.test.cjs
node pruebas/interfaz-simulada.test.cjs
```

Las pruebas usan las bibliotecas estándar de Python y Node.js. La guía de [verificación de GA7](ga7/verificacion-de-entrega.md) distingue las comprobaciones estáticas, de lógica, de DOM simulado y de navegador.
