# Verificación de la entrega de AutoFacture

## Línea base y referencias

La copia de GA7 parte de `2cbba3366ef215832d804aee4dc5bbd90c8d76a4`, último commit de la entrega de GA6. El primer envío al repositorio nuevo trasladó sus quince commits. Los documentos y las pantallas publicados de GA6 se tomaron de esa revisión. Del paquete de preparación recuperé tres pruebas y la maqueta de referencia que citaban los documentos.

La maqueta recuperada se conserva byte por byte. Incluye seis HTML históricos con espacios finales y un CSV con finales de línea CRLF. La excepción de `.gitattributes` conserva los bytes de ese CSV. El resto de los archivos nuevos y editados de la práctica se comprobó con `git diff --check` y `git ls-files --eol`.

## Resultados de Windows

Ejecuté la comprobación desde `ga6/` el 21 de noviembre de 2026 con Python 3.12.14 y Node.js 24.22.3.

| Comprobación | Comando | Resultado |
| --- | --- | --- |
| Estructura y enlaces internos | `python -X utf8 pruebas/estatica.py` | 33 HTML y 718 referencias locales, además de los quince códigos, prioridades y sintaxis de JavaScript. Código 0. |
| Lógica del modelo | `node pruebas/modelo.test.cjs` | 105 comprobaciones. Código 0. |
| Recorrido en DOM simulado | `node pruebas/interfaz-simulada.test.cjs` | 31 combinaciones de pantalla e identidad y casos de revisión, asignación, corrección y reinicio. Código 0. |

La primera ejecución estática detectó que los enlaces CSS de GA6 tienen un parámetro de versión. El script estaba comparando la URL completa con una ruta de archivo. Ajusté la comprobación para separar la ruta del parámetro, exigir que la hoja sea local y verificar que su destino siga siendo `styles.css`. El código funcional de GA6 conserva sus recursos y comportamiento.

La prueba de DOM usa un documento simulado para ejecutar acciones del modelo. El recorrido en navegador se comprueba por separado desde la [demostración pública](https://sebastianblancoay-hash.github.io/autofacture-ga7/ga6/).

## Consultas de cierre

Revisar las diferencias y pruebas en [pull requests](https://github.com/sebastianblancoay-hash/autofacture-ga7/pulls). Los [issues](https://github.com/sebastianblancoay-hash/autofacture-ga7/issues) permiten seguir el formato, la recuperación y el cierre de la etapa. La [historia de main](https://github.com/sebastianblancoay-hash/autofacture-ga7/commits/main/) muestra la línea base y los commits nuevos.

Para comprobar la versión, comparar `git rev-parse main` con `git rev-parse 'v1.0.0^{}'` y verificar que `git cat-file -t v1.0.0` devuelva `tag`. Las notas de [Releases](https://github.com/sebastianblancoay-hash/autofacture-ga7/releases) documentan esa revisión. El informe integrador relaciona la versión con el PR y las capturas de PowerShell.
